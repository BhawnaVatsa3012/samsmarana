import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

if (req.method === 'OPTIONS') return res.status(200).end()

const authHeader = req.headers.authorization
const token = authHeader ? authHeader.replace('Bearer ', '') : null

// Get current user from token
let currentUser = null
if (token) {
const { data } = await supabase.auth.getUser(token)
currentUser = data?.user || null
}

try {
// ── GET reflections ──────────────────────────────
if (req.method === 'GET') {
const { data, error } = await supabase
.from('reflections')
.select('*')
.order('created_at', { ascending: false })
.limit(50)

if (error) return res.status(400).json({ error: error.message })
return res.status(200).json({ reflections: data })
}

if (req.method === 'POST') {
const { action } = req.body

// ── POST reflection ────────────────────────────
if (action === 'post') {
if (!currentUser) return res.status(401).json({ error: 'Please sign in to share a reflection' })

const { reflection, shloka_source, shloka_text } = req.body
if (!reflection || reflection.trim().length < 10) {
return res.status(400).json({ error: 'Reflection must be at least 10 characters' })
}
if (reflection.trim().length > 500) {
return res.status(400).json({ error: 'Reflection must be under 500 characters' })
}

const fullName = currentUser.user_metadata?.full_name
|| currentUser.user_metadata?.name
|| currentUser.email?.split('@')[0]
|| 'Anonymous'

const nameParts = fullName.trim().split(' ')
const initials = nameParts.length >= 2
? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
: nameParts[0][0].toUpperCase()

const { data, error } = await supabase
.from('reflections')
.insert([{
user_id: currentUser.id,
user_name: fullName,
user_initials: initials,
shloka_source,
shloka_text,
reflection: reflection.trim()
}])
.select()

if (error) return res.status(400).json({ error: error.message })
return res.status(200).json({ reflection: data[0] })
}

// ── LIKE reflection ────────────────────────────
if (action === 'like') {
if (!currentUser) return res.status(401).json({ error: 'Please sign in to like' })

const { reflection_id } = req.body

// Check if already liked
const { data: existing } = await supabase
.from('reflection_likes')
.select('id')
.eq('user_id', currentUser.id)
.eq('reflection_id', reflection_id)
.single()

if (existing) {
// Unlike
await supabase.from('reflection_likes')
.delete()
.eq('user_id', currentUser.id)
.eq('reflection_id', reflection_id)

await supabase.from('reflections')
.update({ likes: supabase.rpc('decrement', { x: 1 }) })
.eq('id', reflection_id)

return res.status(200).json({ liked: false })
} else {
// Like
await supabase.from('reflection_likes')
.insert([{ user_id: currentUser.id, reflection_id }])

const { data: updated } = await supabase
.from('reflections')
.update({ likes: supabase.raw('likes + 1') })
.eq('id', reflection_id)
.select()

return res.status(200).json({ liked: true, likes: updated?.[0]?.likes })
}
}

// ── DELETE reflection ──────────────────────────
if (action === 'delete') {
if (!currentUser) return res.status(401).json({ error: 'Please sign in' })

const { reflection_id } = req.body
const { error } = await supabase
.from('reflections')
.delete()
.eq('id', reflection_id)
.eq('user_id', currentUser.id)

if (error) return res.status(400).json({ error: error.message })
return res.status(200).json({ success: true })
}
}

return res.status(400).json({ error: 'Invalid request' })

} catch (error) {
return res.status(500).json({ error: error.message })
}
}