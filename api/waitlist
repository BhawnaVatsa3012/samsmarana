import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
res.setHeader('Access-Control-Allow-Origin', '*');

if (req.method === 'POST') {
const { email, user_id } = JSON.parse(req.body || '{}');
if (!email) return res.status(400).json({ error: 'Email required' });
const { error } = await supabase.from('vidvan_waitlist').insert([{ email, user_id }]);
if (error && error.code === '23505') return res.status(200).json({ message: 'already_registered' });
if (error) return res.status(500).json({ error: error.message });
return res.status(200).json({ message: 'added' });
}

if (req.method === 'GET') {
const token = (req.headers.authorization || '').replace('Bearer ', '');
const { data: userData, error: userError } = await supabase.auth.getUser(token);
if (userError || !userData?.user) return res.status(401).json({ error: 'Unauthorized' });
if (userData.user.email !== 'vatsa.bhawna@gmail.com') return res.status(403).json({ error: 'Forbidden' });
const { data, error } = await supabase.from('vidvan_waitlist').select('*').order('created_at');
if (error) return res.status(500).json({ error: error.message });
return res.status(200).json({ waitlist: data });
}

res.status(405).json({ error: 'Method not allowed' });
}
