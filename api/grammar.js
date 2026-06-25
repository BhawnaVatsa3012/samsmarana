const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const type = req.query.type;

  // TTS branch — POST /api/grammar?type=tts
  if (type === 'tts') {
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST required for tts' });
    const text = (req.body && req.body.text) || '';
    if (!text.trim()) return res.status(400).json({ error: 'text is required' });
    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.ELEVENLABS_VOICE_ID;
    if (!apiKey || !voiceId) return res.status(500).json({ error: 'TTS not configured' });
    try {
      const ttsRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg' },
        body: JSON.stringify({ text: text.trim(), model_id: 'eleven_multilingual_v2', voice_settings: { stability: 0.5, similarity_boost: 0.75 } })
      });
      if (!ttsRes.ok) { const e = await ttsRes.text(); return res.status(ttsRes.status).json({ error: e }); }
      const buf = await ttsRes.arrayBuffer();
      return res.status(200).json({ audio_base64: Buffer.from(buf).toString('base64'), content_type: 'audio/mpeg' });
    } catch (e) { return res.status(500).json({ error: e.message }); }
  }

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (type === 'shabd') {
      const { data, error } = await supabase
        .from('shabd_roop')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return res.status(200).json({ shabd: data });
    }

    if (type === 'dhatu') {
      const { data, error } = await supabase
        .from('dhatu_roop')
        .select('*')
        .order('tense_id')
        .order('sort_order');
      if (error) throw error;
      return res.status(200).json({ dhatu: data });
    }

    return res.status(400).json({ error: 'Invalid type. Use ?type=shabd or ?type=dhatu' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
