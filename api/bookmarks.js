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
.from('bookmarks')
.select('*')
.eq('user_id', user.id)
.order('created_at', { ascending: false });
if (error) return res.status(500).json({ error: error.message });
return res.json({ bookmarks: data });
}

if (req.method === 'POST') {
const { action, id, source, sanskrit, meaning } = req.body;

if (action === 'add') {
const { error } = await supabase
.from('bookmarks')
.insert({ user_id: user.id, source, sanskrit, meaning });
if (error) return res.status(500).json({ error: error.message });
return res.json({ success: true });
}

if (action === 'remove') {
const { error } = await supabase
.from('bookmarks')
.delete()
.eq('id', id)
.eq('user_id', user.id);
if (error) return res.status(500).json({ error: error.message });
return res.json({ success: true });
}
}

return res.status(400).json({ error: 'Invalid request' });
};
