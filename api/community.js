export default async function handler(req, res) {
res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
if (req.method === 'OPTIONS') return res.status(200).end()

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY

const headers = {
'Content-Type': 'application/json',
'apikey': SUPABASE_KEY,
'Authorization': 'Bearer ' + SUPABASE_KEY
}

// Get current user from token
let currentUser = null
const authHeader = req.headers.authorization
if (authHeader && authHeader.startsWith('Bearer ')) {
const token = authHeader.replace('Bearer ', '')
try {
const userRes = await fetch(SUPABASE_URL + '/auth/v1/user', {
headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + token }
})
const userData = await userRes.json()
if (userData.id) currentUser = userData
} catch(e) {}
}

try {
// GET reflections
if (req.method === 'GET') {
const r = await fetch(
SUPABASE_URL + '/rest/v1/reflections?select=*&order=created_at.desc&limit=50',
{ headers }
)
const data = await r.json()
return res.status(200).json({ reflections: Array.isArray(data) ? data : [] })
}

if (req.method === 'POST') {
const { action } = req.body

// POST reflection
if (action === 'post') {
if (!currentUser) return res.status(401).json({ error: 'Please sign in to share' })

const { reflection, shloka_source, shloka_text } = req.body
if (!reflection || reflection.trim().length < 10)
return res.status(400).json({ error: 'Please write at least 10 characters' })
if (reflection.trim().length > 500)
return res.status(400).json({ error: 'Please keep under 500 characters' })

const fullName = currentUser.user_metadata?.full_name
|| currentUser.user_metadata?.name
|| currentUser.email?.split('@')[0]
|| 'Anonymous'
const parts = fullName.trim().split(' ')
const initials = parts.length >= 2
? (parts[0][0] + parts[parts.length-1][0]).toUpperCase()
: parts[0][0].toUpperCase()

const insertRes = await fetch(SUPABASE_URL + '/rest/v1/reflections', {
method: 'POST',
headers: { ...headers, 'Prefer': 'return=representation',
'Authorization': 'Bearer ' + authHeader.replace('Bearer ','') },
body: JSON.stringify({
user_id: currentUser.id,
user_name: fullName,
user_initials: initials,
shloka_source: shloka_source || '',
shloka_text: shloka_text || '',
reflection: reflection.trim()
})
})
const inserted = await insertRes.json()
if (insertRes.status >= 400) return res.status(400).json({ error: inserted.message || 'Could not save reflection' })
return res.status(200).json({ reflection: Array.isArray(inserted) ? inserted[0] : inserted })
}

// LIKE reflection
if (action === 'like') {
if (!currentUser) return res.status(401).json({ error: 'Please sign in to like' })
const { reflection_id } = req.body
const token = authHeader.replace('Bearer ','')
const authHeaders = { ...headers, 'Authorization': 'Bearer ' + token }

// Check if already liked
const checkRes = await fetch(
SUPABASE_URL + '/rest/v1/reflection_likes?user_id=eq.' + currentUser.id + '&reflection_id=eq.' + reflection_id,
{ headers: authHeaders }
)
const existing = await checkRes.json()

if (Array.isArray(existing) && existing.length > 0) {
// Unlike
await fetch(
SUPABASE_URL + '/rest/v1/reflection_likes?user_id=eq.' + currentUser.id + '&reflection_id=eq.' + reflection_id,
{ method: 'DELETE', headers: authHeaders }
)
// Decrement likes
const getRes = await fetch(SUPABASE_URL + '/rest/v1/reflections?id=eq.' + reflection_id, { headers })
const rData = await getRes.json()
const currentLikes = rData[0]?.likes || 0
await fetch(SUPABASE_URL + '/rest/v1/reflections?id=eq.' + reflection_id, {
method: 'PATCH', headers: { ...authHeaders, 'Prefer': 'return=representation' },
body: JSON.stringify({ likes: Math.max(0, currentLikes - 1) })
})
return res.status(200).json({ liked: false })
} else {
// Like
await fetch(SUPABASE_URL + '/rest/v1/reflection_likes', {
method: 'POST', headers: { ...authHeaders, 'Prefer': 'return=representation' },
body: JSON.stringify({ user_id: currentUser.id, reflection_id })
})
// Increment likes
const getRes = await fetch(SUPABASE_URL + '/rest/v1/reflections?id=eq.' + reflection_id, { headers })
const rData = await getRes.json()
const currentLikes = rData[0]?.likes || 0
await fetch(SUPABASE_URL + '/rest/v1/reflections?id=eq.' + reflection_id, {
method: 'PATCH', headers: { ...authHeaders, 'Prefer': 'return=representation' },
body: JSON.stringify({ likes: currentLikes + 1 })
})
return res.status(200).json({ liked: true, likes: currentLikes + 1 })
}
}

// DELETE reflection
if (action === 'delete') {
if (!currentUser) return res.status(401).json({ error: 'Please sign in' })
const { reflection_id } = req.body
const token = authHeader.replace('Bearer ','')
await fetch(
SUPABASE_URL + '/rest/v1/reflections?id=eq.' + reflection_id + '&user_id=eq.' + currentUser.id,
{ method: 'DELETE', headers: { ...headers, 'Authorization': 'Bearer ' + token } }
)
return res.status(200).json({ success: true })
}
}

return res.status(400).json({ error: 'Invalid request' })
} catch(error) {
return res.status(500).json({ error: error.message })
}
}
