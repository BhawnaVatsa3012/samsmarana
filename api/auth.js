export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const SUPABASE_URL = process.env.SUPABASE_URL
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Supabase environment variables missing' })
  }

  try {
    let body = req.body

    if (typeof body === 'string') {
      body = JSON.parse(body)
    } else if (!body) {
      const raw = await new Promise((resolve, reject) => {
        let data = ''
        req.on('data', chunk => data += chunk)
        req.on('end', () => resolve(data))
        req.on('error', reject)
      })
      body = JSON.parse(raw)
    }

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

 if (action === 'resetpassword') {
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const { error } = await supabase.auth.signInWithOtp({ email: body.email, options: { shouldCreateUser: false } });
if (error) return res.status(400).json({ error: error.message });
return res.json({ success: true });
}

    if (action === 'updatepassword') {
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  const { data: { user }, error: userError } = await supabase.auth.getUser(req.body.token);
  if (userError) return res.status(400).json({ error: 'Invalid or expired reset link.' });
  const adminSupabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  const { error } = await adminSupabase.auth.admin.updateUserById(user.id, { password: req.body.password });
  if (error) return res.status(400).json({ error: error.message });
  return res.json({ success: true });
}

if (action === 'verifyotp') {
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  const { data, error } = await supabase.auth.verifyOtp({ email: body.email, token: body.token, type: 'email' });
  if (error) return res.status(400).json({ error: error.message });
  return res.json({ access_token: data.session.access_token });
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
    // Log only the error type: a JSON parse error message can contain part of the request body (passwords).
    console.error('AUTH ERROR:', error.name)
    return res.status(500).json({ error: error.message })
  }
}
