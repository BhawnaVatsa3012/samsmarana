const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const type = req.query.type;

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
