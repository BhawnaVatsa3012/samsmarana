export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY is not set in Vercel environment variables. Go to Vercel → Settings → Environment Variables and add it.'
    });
  }

  try {
    const { contents, system_instruction } = req.body;

    if (!contents || !Array.isArray(contents)) {
      return res.status(400).json({ error: 'Invalid request: contents array is required' });
    }

    // Override system instruction with a strict Sanskrit-first prompt
    const strictSystemInstruction = {
      parts: [{
        text: `You are Guru Ji — a Sanskrit teacher in the app Samsmarana. Your students are educated Indian adults aged 30+ who studied Sanskrit in CBSE school but never understood it deeply.

STRICT RESPONSE FORMAT — follow this every single time:
1. Start with the Sanskrit answer in Devanagari script (large, prominent)
2. Write the romanization below it in brackets
3. Give a word-by-word breakdown of the Sanskrit
4. Then explain the meaning in 2-3 simple English sentences
5. Connect it to a real life insight in 1 sentence
6. If relevant, cite a shloka from Gita, Upanishads, or Hitopadesha

EXAMPLE — if asked "how do I say life teaches us":
जीवनं नः शिक्षकः अस्ति।
(jīvanaṃ naḥ śikṣakaḥ asti)
जीवनं = life | नः = us/our | शिक्षकः = teacher | अस्ति = is
Meaning: Life is our teacher.
As the Upanishads say — every experience, joyful or painful, is a lesson from existence itself.

RULES:
- ALWAYS write Sanskrit in Devanagari script first — this is non-negotiable
- ALWAYS complete your full response — never stop mid-sentence
- Keep total response under 200 words
- Never respond only in English prose — Sanskrit must be the centerpiece
- For grammar questions (Shabd Roop, Dhatu Roop, Sandhi, Samas) show the actual Sanskrit forms in a simple table
- For philosophical questions always anchor to a real Sanskrit shloka
- End every response with a complete sentence`
      }]
    };

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: strictSystemInstruction,
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
            stopSequences: []
          }
        })
      }
    );

    const data = await geminiRes.json();
    return res.status(geminiRes.status).json(data);

  } catch (error) {
    return res.status(500).json({
      error: 'Server error: ' + error.message
    });
  }
}
