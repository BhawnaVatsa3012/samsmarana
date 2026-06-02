const Razorpay = require('razorpay');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const razorpay = new Razorpay({
key_id: process.env.RAZORPAY_KEY_ID,
key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async function handler(req, res) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
if (req.method === 'OPTIONS') return res.status(200).end();

const action = req.query.action;

// ── CREATE ORDER ──────────────────────────────────────────
if (req.method === 'POST' && action === 'create-order') {
const { plan, userId } = req.body;
const amount = plan === 'yearly' ? 199900 : 29900; // paise
try {
const order = await razorpay.orders.create({
amount,
currency: 'INR',
receipt: `sam_${Date.now()}`,
notes: { userId, plan }
});
return res.status(200).json({
orderId: order.id,
amount,
currency: 'INR'
});
} catch (err) {
return res.status(500).json({ error: err.message });
}
}

// ── WEBHOOK ───────────────────────────────────────────────
if (req.method === 'POST' && action === 'webhook') {
const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
const signature = req.headers['x-razorpay-signature'];
const body = JSON.stringify(req.body);

const expected = crypto
.createHmac('sha256', secret)
.update(body)
.digest('hex');

if (signature !== expected) {
return res.status(400).json({ error: 'Invalid signature' });
}

if (req.body.event === 'payment.captured') {
const notes = req.body.payload?.payment?.entity?.notes;
const userId = notes?.userId;
if (userId) {
const { error } = await supabase.auth.admin.updateUserById(userId, {
user_metadata: { tier: 'sadhaka', premium: true }
});
if (error) return res.status(500).json({ error: error.message });
}
}
return res.status(200).json({ received: true });
}

return res.status(405).json({ error: 'Method not allowed' });
};
