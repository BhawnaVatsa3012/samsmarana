const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
if (req.method === 'OPTIONS') return res.status(200).end();

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_KEY
);

const token = (req.headers.authorization || '').replace('Bearer ', '');
if (!token) return res.status(401).json({ error: 'Unauthorized' });

const { data: { user }, error: userError } = await supabase.auth.getUser(token);
if (userError || !user) return res.status(401).json({ error: 'Invalid token' });

if (req.method === 'GET') {
const { data, error } = await supabase
.from('profiles')
.select('*')
.eq('id', user.id)
.single();
if (error && error.code !== 'PGRST116') return res.status(500).json({ error: error.message });
return res.json({ profile: data || null });
}

if (req.method === 'POST') {
const { display_name, bio } = req.body;
if (!display_name) return res.status(400).json({ error: 'display_name is required' });

const { data, error } = await supabase
.from('profiles')
.upsert({ id: user.id, display_name, bio: bio || '', updated_at: new Date().toISOString() })
.select()
.single();

if (error) return res.status(500).json({ error: error.message });
return res.json({ profile: data });
}

return res.status(400).json({ error: 'Invalid request' });
};
