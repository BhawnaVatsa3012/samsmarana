const { createClient } = require('@supabase/supabase-js');

//const supabase = createClient(
//process.env.SUPABASE_URL,
//process.env.SUPABASE_ANON_KEY
//);

const MILESTONE_MESSAGES = {
10: '🥉 {name} has just earned the Bronze Badge and begun their Sanskrit journey! वेदाहमेतम् — I have known this. 🙏',
30: '🥈 {name} has earned the Silver Badge — 30 points of Sanskrit wisdom! चरैवेति चरैवेति 🙏',
50: '🥇 {name} has earned the Gold Badge — a true Sadhaka of Sanskrit! विद्या ददाति विनयम् 🙏'
};

async function postMilestoneToCommunity(userName, milestone, userId) {
const msg = MILESTONE_MESSAGES[milestone].replace('{name}', userName);
await supabase.from('community_reflections').insert({
user_id: userId,
user_name: userName,
user_initials: userName.split(' ').map(function(w){ return w[0]; }).join('').toUpperCase().slice(0,2),
shloka_source: 'Milestone Achievement',
shloka_text: '',
reflection: msg,
likes: 0
});
}

module.exports = async function handler(req, res) {
const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY
);
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
if (req.method === 'OPTIONS') return res.status(200).end();

// Auth check
var token = (req.headers.authorization || '').replace('Bearer ', '');
if (!token) return res.status(401).json({ error: 'Not authenticated' });

var { data: { user }, error: authErr } = await supabase.auth.getUser(token);
if (authErr || !user) return res.status(401).json({ error: 'Invalid session' });

var userId = user.id;
var meta = user.user_metadata || {};
var userName = meta.full_name || meta.name || user.email.split('@')[0];

// ── GET — fetch progress + incorrect answers log ──
if (req.method === 'GET') {
var { data: progress } = await supabase
.from('user_progress')
.select('*')
.eq('user_id', userId)
.single();

var today = new Date().toISOString().slice(0, 10);
var { data: todayAttempt } = await supabase
.from('quiz_attempts')
.select('*')
.eq('user_id', userId)
.eq('attempt_date', today)
.single();

// All incorrect answers across all attempts
var { data: allAttempts } = await supabase
.from('quiz_attempts')
.select('answers, attempt_date')
.eq('user_id', userId)
.order('attempt_date', { ascending: false });

var incorrectLog = [];
if (allAttempts) {
allAttempts.forEach(function(attempt) {
var answers = attempt.answers || [];
answers.forEach(function(a) {
if (!a.correct) {
incorrectLog.push({
date: attempt.attempt_date,
question: a.question,
chosen: a.chosen,
correct: a.correctOption,
explain: a.explain
});
}
});
});
}

return res.status(200).json({
progress: progress || { cumulative_score: 0, badge_level: 'none', last_attempt_date: null, streak_count: 0 },
attempted_today: !!todayAttempt,
today_score: todayAttempt ? todayAttempt.score : null,
incorrect_log: incorrectLog
});
}

// ── POST — submit quiz answers ──
if (req.method === 'POST') {
var { answers } = req.body; // array of {question, chosen, correctOption, correct, explain}
if (!answers || !Array.isArray(answers)) {
return res.status(400).json({ error: 'Invalid answers payload' });
}

var today = new Date().toISOString().slice(0, 10);

// Check not already attempted today
var { data: existing } = await supabase
.from('quiz_attempts')
.select('id')
.eq('user_id', userId)
.eq('attempt_date', today)
.single();

if (existing) {
return res.status(400).json({ error: 'already_attempted' });
}

var score = answers.filter(function(a){ return a.correct; }).length;

// Save attempt
await supabase.from('quiz_attempts').insert({
user_id: userId,
attempt_date: today,
score: score,
total: answers.length,
answers: answers
});

// Fetch current progress
var { data: progress } = await supabase
.from('user_progress')
.select('*')
.eq('user_id', userId)
.single();

var prevScore = progress ? progress.cumulative_score : 0;
var prevBadge = progress ? progress.badge_level : 'none';
var prevStreak = progress ? (progress.streak_count || 0) : 0;
var prevAttemptDate = progress ? progress.last_attempt_date : null;
var newScore = prevScore + score;

var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
var newStreak;
if (prevAttemptDate === yesterday) {
newStreak = prevStreak + 1;
} else if (prevAttemptDate === today) {
newStreak = prevStreak;
} else {
newStreak = 1;
}

// Determine new badge
var newBadge = prevBadge;
if (newScore >= 50) newBadge = 'gold';
else if (newScore >= 30) newBadge = 'silver';
else if (newScore >= 10) newBadge = 'bronze';

// Upsert progress
await supabase.from('user_progress').upsert({
user_id: userId,
cumulative_score: newScore,
badge_level: newBadge,
last_attempt_date: today,
streak_count: newStreak,
updated_at: new Date().toISOString()
});

// Check milestone crossed
var milestones = [10, 30, 50];
for (var i = 0; i < milestones.length; i++) {
var m = milestones[i];
if (prevScore < m && newScore >= m) {
try { await postMilestoneToCommunity(userName, m, userId); } catch(e) {}
break;
}
}

return res.status(200).json({
score: score,
cumulative_score: newScore,
badge_level: newBadge,
streak_count: newStreak,
milestone_reached: (prevScore < 10 && newScore >= 10) ? 10 :
(prevScore < 30 && newScore >= 30) ? 30 :
(prevScore < 50 && newScore >= 50) ? 50 : null
});
}

return res.status(405).json({ error: 'Method not allowed' });
};
