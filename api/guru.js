export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Check API key is set
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY is not set in Vercel environment variables. Go to Vercel → your project → Settings → Environment Variables and add it.'
    });
  }

  try {
    const { contents, system_instruction } = req.body;

    if (!contents || !Array.isArray(contents)) {
      return res.status(400).json({ error: 'Invalid request: contents array is required' });
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction,
          contents,
          generationConfig: { temperature: 0.8, maxOutputTokens: 1024 }
        })
      }
    );

    // Pass through exact Gemini response (including any errors)
    const data = await geminiRes.json();
    return res.status(geminiRes.status).json(data);

  } catch (error) {
    return res.status(500).json({
      error: 'Server error: ' + error.message,
      tip: 'Check Vercel function logs for details'
    });
  }
}
