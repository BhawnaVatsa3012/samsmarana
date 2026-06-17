const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { user_id, endpoint, p256dh, auth, action } = req.body;

  if (!endpoint) return res.status(400).json({ error: 'Missing endpoint' });

  if (action === 'unsubscribe') {
    const { error } = await supabase
      .from('subscriptions')
      .delete()
      .eq('endpoint', endpoint);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true });
  }

  // Subscribe
  if (!user_id || !p256dh || !auth) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { error } = await supabase
    .from('subscriptions')
    .upsert({ user_id, endpoint, p256dh, auth }, { onConflict: 'endpoint' });

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ ok: true });
};
