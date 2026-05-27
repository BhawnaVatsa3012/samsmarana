export default async function handler(req, res) {
res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
if (req.method === 'OPTIONS') return res.status(200).end()

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY

try {
const { refresh_token } = req.body
if (!refresh_token) return res.status(400).json({ error: 'No refresh token' })

const r = await fetch(SUPABASE_URL + '/auth/v1/token?grant_type=refresh_token', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'apikey': SUPABASE_KEY
},
body: JSON.stringify({ refresh_token })
})
const data = await r.json()
if (data.error) return res.status(401).json({ error: data.error_description || data.error })
return res.status(200).json({
access_token: data.access_token,
refresh_token: data.refresh_token,
user: data.user
})
} catch(e) {
return res.status(500).json({ error: e.message })
}
}
