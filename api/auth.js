import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

if (req.method === 'OPTIONS') return res.status(200).end()
if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

const { action, email, password, token } = req.body

try {
// Sign up new user
if (action === 'signup') {
const { data, error } = await supabase.auth.signUp({ email, password })
if (error) return res.status(400).json({ error: error.message })
return res.status(200).json({ user: data.user, session: data.session })
}

// Sign in existing user
if (action === 'signin') {
const { data, error } = await supabase.auth.signInWithPassword({ email, password })
if (error) return res.status(400).json({ error: error.message })
return res.status(200).json({ user: data.user, session: data.session })
}

// Sign in with Google
if (action === 'google') {
const { data, error } = await supabase.auth.signInWithOAuth({
provider: 'google',
options: { redirectTo: process.env.APP_URL }
})
if (error) return res.status(400).json({ error: error.message })
return res.status(200).json({ url: data.url })
}

// Sign out
if (action === 'signout') {
const { error } = await supabase.auth.signOut()
if (error) return res.status(400).json({ error: error.message })
return res.status(200).json({ success: true })
}

// Get current user from token
if (action === 'getuser') {
const { data, error } = await supabase.auth.getUser(token)
if (error) return res.status(400).json({ error: error.message })
return res.status(200).json({ user: data.user })
}

return res.status(400).json({ error: 'Invalid action' })

} catch (error) {
return res.status(500).json({ error: error.message })
}
}