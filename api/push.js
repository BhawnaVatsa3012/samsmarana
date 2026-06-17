const webpush = require('web-push');

module.exports = async function handler(req, res) {
  const supabase = require('@supabase/supabase-js').createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );

  // Auth check — only GitHub Actions cron or admin can trigger
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Today's shloka — rotate through 14 by day of year
  const shlokas = [
    { text: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।', source: 'भगवद्गीता २.४७' },
    { text: 'विद्या ददाति विनयं विनयाद् याति पात्रताम्।', source: 'हितोपदेश' },
    { text: 'अहिंसा परमो धर्मः।', source: 'महाभारत' },
    { text: 'सत्यमेव जयते।', source: 'मुण्डकोपनिषद् ३.१.६' },
    { text: 'योगः कर्मसु कौशलम्।', source: 'भगवद्गीता २.५०' },
    { text: 'वसुधैव कुटुम्बकम्।', source: 'महोपनिषद् ६.७१' },
    { text: 'आत्मनः प्रतिकूलानि परेषां न समाचरेत्।', source: 'पद्मपुराण' },
    { text: 'ज्ञानं परमं बलम्।', source: 'चाणक्यनीति' },
    { text: 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः।', source: 'हितोपदेश' },
    { text: 'धर्मो रक्षति रक्षितः।', source: 'मनुस्मृति ८.१५' },
    { text: 'सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।', source: 'बृहदारण्यकोपनिषद्' },
    { text: 'तमसो मा ज्योतिर्गमय।', source: 'बृहदारण्यकोपनिषद् १.३.२८' },
    { text: 'अयं निजः परो वेति गणना लघुचेतसाम्।', source: 'महोपनिषद्' },
    { text: 'शनैः पन्थाः शनैः कन्था शनैः पर्वतमस्तकम्।', source: 'चाणक्यनीति' }
  ];

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  );
  const shloka = shlokas[dayOfYear % shlokas.length];

  const payload = JSON.stringify({
    title: 'आज का श्लोक',
    body: shloka.text,
    source: shloka.source,
    url: '/?section=shloka-of-day'
  });

  // Fetch all subscriptions
  const { data: subscriptions, error } = await supabase
    .from('subscriptions')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!subscriptions || subscriptions.length === 0) {
    return res.status(200).json({ message: 'No subscriptions found', sent: 0 });
  }

  // Send push to all subscribers
  const results = await Promise.allSettled(
    subscriptions.map(sub =>
      webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: { p256dh: sub.p256dh, auth: sub.auth }
        },
        payload
      )
    )
  );

  // Remove expired/invalid subscriptions (410 Gone)
  const expiredEndpoints = [];
  results.forEach((result, i) => {
    if (result.status === 'rejected') {
      const statusCode = result.reason?.statusCode;
      if (statusCode === 410 || statusCode === 404) {
        expiredEndpoints.push(subscriptions[i].endpoint);
      }
    }
  });

  if (expiredEndpoints.length > 0) {
    await supabase
      .from('subscriptions')
      .delete()
      .in('endpoint', expiredEndpoints);
  }

  const sent = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;

  return res.status(200).json({ sent, failed, expired_removed: expiredEndpoints.length });
};
