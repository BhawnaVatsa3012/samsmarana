export default async function handler(req, res) {
  console.log('AUTH CALLED - method:', req.method)

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const SUPABASE_URL = process.env.SUPABASE_URL
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY

  console.log('ENV CHECK - URL exists:', !!SUPABASE_URL, '| KEY exists:', !!SUPABASE_KEY)

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Supabase environment variables missing' })
  }

  try {
    let body = req.body
    console.log('BODY TYPE:', typeof body, '| BODY:', JSON.stringify(body))

    if (typeof body === 'string') {
      body = JSON.parse(body)
    } else if (!body) {
      const raw = await new Promise((resolve, reject) => {
        let data = ''
        req.on('data', chunk => data += chunk)
        req.on('end', () => resolve(data))
        req.on('error', reject)
      })
      console.log('RAW BODY:', raw)
      body = JSON.parse(raw)
    }

    const action = body.action
    console.log('ACTION:', action)

    if (action === 'getuser') {
      console.log('GETUSER - token exists:', !!body.token)
      const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        headers: {
          'Authorization': `Bearer ${body.token}`,
          'apikey': SUPABASE_KEY
        }
      })
      console.log('SUPABASE STATUS:', r.status)
      const user = await r.json()
      console.log('SUPABASE RESPONSE:', JSON.stringify(user))
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
const { email } = req.body;
const { error } = await supabase.auth.resetPasswordForEmail(email, {
redirectTo: 'https://samsmarana.vercel.app'
});
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
  const { data, error } = await supabase.auth.verifyOtp({ email: body.email, token: body.token, type: 'recovery' });
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
    console.log('CAUGHT ERROR:', error.message, error.stack)
    return res.status(500).json({ error: error.message })
  }
}
