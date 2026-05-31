// api/shlokas.js — Fetches active shloka cards from Supabase
// Cards are returned only if go_live_at <= today

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(500).json({ error: 'Missing Supabase environment variables' });
  }

  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const url = `${SUPABASE_URL}/rest/v1/shloka_cards` +
      `?select=id,theme,sanskrit,transliteration,hindi,english,real_life` +
      `&active=eq.true` +
      `&go_live_at=lte.${today}` +
      `&order=go_live_at.asc`;

    const response = await fetch(url, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Supabase error:', errText);
      return res.status(500).json({ error: 'Failed to fetch from Supabase', detail: errText });
    }

    const cards = await response.json();
    return res.status(200).json({ cards });

  } catch (err) {
    console.error('shlokas.js error:', err);
    return res.status(500).json({ error: 'Internal server error', detail: err.message });
  }
}
