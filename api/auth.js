export default async function handler(req, res) {
res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
if (req.method === 'OPTIONS') return res.status(200).end()
if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
return res.status(500).json({ error: 'Supabase environment variables not set' })
}

try {
const { action, email, password, token } = req.body

if (action === 'signup') {
const r = await fetch(SUPABASE_URL + '/auth/v1/signup', {
method: 'POST',
headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_KEY },
body: JSON.stringify({ email, password })
})
const data = await r.json()
if (data.error) return res.status(400).json({ error: data.error_description || data.error })
return res.status(200).json({ user: data.user, session: data.session })
}

if (action === 'signin') {
const r = await fetch(SUPABASE_URL + '/auth/v1/token?grant_type=password', {
method: 'POST',
headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_KEY },
body: JSON.stringify({ email, password })
})
const data = await r.json()
if (data.error) return res.status(400).json({ error: data.error_description || data.error })
return res.status(200).json({ user: data.user, session: { access_token: data.access_token, refresh_token: data.refresh_token } })
}

if (action === 'google') {
const redirectTo = process.env.APP_URL || 'https://samsmarana.vercel.app'
return res.status(200).json({
url: SUPABASE_URL + '/auth/v1/authorize?provider=google&redirect_to=' + encodeURIComponent(redirectTo)
})
}

if (action === 'getuser') {
if (!token) return res.status(400).json({ error: 'No token provided' })
const r = await fetch(SUPABASE_URL + '/auth/v1/user', {
headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + token }
})
const data = await r.json()
if (data.error || !data.id) return res.status(401).json({ error: data.error || 'Invalid token' })
return res.status(200).json({ user: data })
}

if (action === 'signout') {
if (token) {
await fetch(SUPABASE_URL + '/auth/v1/logout', {
method: 'POST',
headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + token }
})
}
return res.status(200).json({ success: true })
}

if (action === 'refresh') {
const { refresh_token } = req.body
const r = await fetch(SUPABASE_URL + '/auth/v1/token?grant_type=refresh_token', {
method: 'POST',
headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_KEY },
body: JSON.stringify({ refresh_token })
})
const data = await r.json()
if (data.error) return res.status(401).json({ error: data.error_description || data.error })
return res.status(200).json({
user: data.user,
access_token: data.access_token,
refresh_token: data.refresh_token
})
}

return res.status(400).json({ error: 'Invalid action' })

} catch (error) {
return res.status(500).json({ error: error.message })
}
}
