const { createClient } = require('@supabase/supabase-js');

const VOCAB_CARDS = [
  {d:'विवेक',r:'Viveka',m:'Discernment — the ability to tell the real from the unreal, the eternal from the temporary.',shloka:'नित्यानित्यवस्तुविवेकः',slokaMeaning:'Discrimination between the eternal and the transient — the first qualification for seeking truth.',source:'Vivekachudamani — Adi Shankaracharya'},
  {d:'वैराग्य',r:'Vairagya',m:'Dispassion — not bitterness toward the world, but freedom from being pulled by it.',shloka:'वि + राग = वैराग्य',slokaMeaning:'Vi means without, raga means passion. Vairagya is being without the colouring of desire — seeing clearly.',source:'Vedanta etymology — Vivekachudamani'},
  {d:'तितिक्षा',r:'Titiksha',m:'Patient endurance of opposites — bearing heat and cold, praise and insult, with equal steadiness.',shloka:'सहनं सर्वदुःखानामप्रतीकारपूर्वकम् । चिन्ताविलापरहितं सा तितिक्षा निगद्यते ॥',slokaMeaning:'Bearing all suffering without retaliation, without worry, without lament — that is called Titiksha.',source:'Vivekachudamani 24 — Adi Shankaracharya'},
  {d:'उपेक्षा',r:'Upeksha',m:'Equanimity toward the indifferent — not every situation deserves your emotional energy.',shloka:'मैत्रीकरुणामुदितोपेक्षाणां सुखदुःखपुण्यापुण्यविषयाणाम्',slokaMeaning:'Friendliness toward the happy, compassion for the suffering, joy for the virtuous, equanimity toward the wicked.',source:'Yoga Sutras 1.33 — Patanjali'},
  {d:'समत्व',r:'Samatva',m:'Evenness of mind — where neither success nor failure disturbs the inner stillness.',shloka:'समत्वं योग उच्यते',slokaMeaning:'Evenness of mind is called Yoga.',source:'Bhagavad Gita 2.48 — Vyasa'},
  {d:'निर्वेद',r:'Nirveda',m:'The weariness of the world — not despair, but the turning inward that precedes wisdom.',shloka:'शमो दमस्तितिक्षा च निर्वेदः',slokaMeaning:'Calmness, self-restraint, endurance, and nirveda — these travel together on the path.',source:'Bhagavata Purana 11.19'},
  {d:'मुमुक्षुत्व',r:'Mumukshutva',m:'The burning desire for liberation — not a casual wish, but an urgency that consumes all distraction.',shloka:'मोक्षो मे भूयात् इति इच्छा मुमुक्षुत्वम्',slokaMeaning:'The intense desire May I be liberated — this longing itself is called Mumukshutva.',source:'Tattva Bodha — Adi Shankaracharya'},
  {d:'अन्तरात्मन्',r:'Antaratman',m:'The inner self — the witness that watches all your thoughts without ever being touched by them.',shloka:'अन्तरात्मा तु सर्वेषां साक्षी',slokaMeaning:'The inner self is the witness of all.',source:'Manusmriti 8.85'},
  {d:'चित्तवृत्ति',r:'Chittavritti',m:'The modifications of the mind — every thought, memory, judgment that arises and disturbs stillness.',shloka:'योगश्चित्तवृत्तिनिरोधः',slokaMeaning:'Yoga is the cessation of the modifications of the mind.',source:'Yoga Sutras 1.2 — Patanjali'},
  {d:'उपाधि',r:'Upadhi',m:'A limiting label — the roles we wear that make us forget what we truly are beneath them.',shloka:'देहो देवालयः प्रोक्तः जीवो देवः सनातनः',slokaMeaning:'The body is the temple; the soul within is the eternal deity.',source:'Shiva Purana'},
  {d:'श्रद्धा',r:'Shraddha',m:'Not blind faith — trust born of direct experience. The willingness to move toward what is true.',shloka:'श्रद्धावाँल्लभते ज्ञानम्',slokaMeaning:'One who has Shraddha attains knowledge.',source:'Bhagavad Gita 4.39'},
  {d:'विषाद',r:'Vishada',m:'The grief that opens the door — the collapse that made the Gita necessary.',shloka:'सीदन्ति मम गात्राणि मुखं च परिशुष्यति',slokaMeaning:'My limbs fail and my mouth is parched — the beginning of all wisdom.',source:'Bhagavad Gita 1.29 — Arjuna'},
  {d:'अभिनिवेश',r:'Abhinivesha',m:'The clinging to life — the deepest instinct, present even in the wisest, that binds us to existence.',shloka:'स्वरसवाही विदुषोऽपि तथारूढोऽभिनिवेशः',slokaMeaning:'Flowing by its own force, even in the wise, is the deeply rooted clinging to life.',source:'Yoga Sutras 2.9 — Patanjali'},
  {d:'तुरीय',r:'Turiya',m:'The fourth state — beyond waking, dreaming, and deep sleep. The pure awareness that witnesses all three.',shloka:'शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते',slokaMeaning:'The fourth is peaceful, auspicious, non-dual — the witness of all phenomena.',source:'Mandukya Upanishad 7'},
  {d:'प्रज्ञा',r:'Prajna',m:'Wisdom settled into the bones — not what you know, but what you have irreversibly become.',shloka:'प्रजहाति यदा कामान्सर्वान्पार्थ मनोगतान् । आत्मन्येवात्मना तुष्टः स्थितप्रज्ञस्तदोच्यते ॥',slokaMeaning:'When one abandons all desires of the mind and is content in the self alone — they are called Sthitaprajna.',source:'Bhagavad Gita 2.55'},
];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const type = req.query.type;

  // TTS branch — POST /api/grammar?type=tts
  if (type === 'tts') {
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST required for tts' });
    const text = (req.body && req.body.text) || '';
    if (!text.trim()) return res.status(400).json({ error: 'text is required' });
    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.ELEVENLABS_VOICE_ID;
    if (!apiKey || !voiceId) return res.status(500).json({ error: 'TTS not configured' });
    try {
      const ttsRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg' },
        body: JSON.stringify({ text: text.trim(), model_id: 'eleven_multilingual_v2', voice_settings: { stability: 0.5, similarity_boost: 0.75 } })
      });
      if (!ttsRes.ok) { const e = await ttsRes.text(); return res.status(ttsRes.status).json({ error: e }); }
      const buf = await ttsRes.arrayBuffer();
      return res.status(200).json({ audio_base64: Buffer.from(buf).toString('base64'), content_type: 'audio/mpeg' });
    } catch (e) { return res.status(500).json({ error: e.message }); }
  }

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  if (type === 'shabd' || type === 'dhatu' || type === 'vocab') {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData?.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const meta = userData.user.user_metadata || {};
    const appMeta = userData.user.app_metadata || {};
    const tier = meta.tier || appMeta.tier ||
      ((meta.premium === true || appMeta.premium === true || meta.premium === 'true') ? 'sadhaka' : 'jigyasu');

    if (type === 'shabd' && tier !== 'sadhaka' && tier !== 'vidvan') {
      return res.status(403).json({ error: 'Sadhaka or Vidvan tier required' });
    }
    if (type === 'dhatu' && tier !== 'vidvan') {
      return res.status(403).json({ error: 'Vidvan tier required' });
    }
    if (type === 'vocab' && tier !== 'sadhaka' && tier !== 'vidvan') {
      return res.status(403).json({ error: 'Sadhaka or Vidvan tier required' });
    }
  }

  try {
    if (type === 'shabd') {
      const { data, error } = await supabase
        .from('shabd_roop')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return res.status(200).json({ shabd: data });
    }

    if (type === 'dhatu') {
      const { data, error } = await supabase
        .from('dhatu_roop')
        .select('*')
        .order('tense_id')
        .order('sort_order');
      if (error) throw error;
      return res.status(200).json({ dhatu: data });
    }

    if (type === 'vocab') {
      return res.status(200).json({ vocab: VOCAB_CARDS });
    }

    return res.status(400).json({ error: 'Invalid type. Use ?type=shabd, ?type=dhatu, or ?type=vocab' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
