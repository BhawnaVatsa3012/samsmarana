export default async function handler(req, res) {
if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
return res.status(500).json({ error: 'Supabase environment variables missing' })
}

try {
const body = req.body
const action = body.action

if (action === 'getuser') {
const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
headers: {
'Authorization': `Bearer ${body.token}`,
'apikey': SUPABASE_KEY
}
})
const user = await r.json()
return res.json({ user })
}

if (action === 'signin') {
const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
method: 'POST',
headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_KEY },
body: JSON.stringify({ email: body.email, password: body.password })
})
const data = await r.json()
if (data.error) return res.json({ error: data.error_description || data.error })
return res.json({ user: data.user, session: data })
}

if (action === 'signup') {
const r = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
method: 'POST',
headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_KEY },
body: JSON.stringify({ email: body.email, password: body.password })
})
const data = await r.json()
if (data.error) return res.json({ error: data.error_description || data.error })
return res.json({ user: data.user, session: data })
}

if (action === 'signout') {
await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
method: 'POST',
headers: { 'Authorization': `Bearer ${body.token}`, 'apikey': SUPABASE_KEY }
})
return res.json({ success: true })
}

return res.status(400).json({ error: 'Invalid action' })

} catch (error) {
return res.status(500).json({ error: error.message })
}
}
