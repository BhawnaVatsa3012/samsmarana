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
const { plan, tier, userId } = req.body;
const PRICES = {
sadhaka: { monthly: 29900, yearly: 199900 },
vidvan:  { monthly: 49900, yearly: 399900 }
};
const amount = PRICES[tier]?.[plan];
if (!amount) return res.status(400).json({ error: 'Invalid tier/plan combination' });
try {
const order = await razorpay.orders.create({
amount,
currency: 'INR',
receipt: `sam_${Date.now()}`,
notes: { userId, plan, tier }
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
const purchasedTier = notes?.tier || 'sadhaka'; // fallback covers pre-existing orders with no tier in notes
if (userId) {
const { error } = await supabase.auth.admin.updateUserById(userId, {
user_metadata: { tier: purchasedTier, premium: true }
});
if (error) return res.status(500).json({ error: error.message });
}
}
return res.status(200).json({ received: true });
}

// ── UPGRADE TIER ─────────────────────────────────────────
if (req.method === 'POST' && action === 'upgrade-tier') {
const { userId, paymentId, orderId, signature } = req.body;
if (!userId || !paymentId || !orderId || !signature) {
return res.status(400).json({ error: 'Missing fields' });
}

// Verify payment signature
const expected = crypto
.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
.update(orderId + '|' + paymentId)
.digest('hex');

if (signature !== expected) {
return res.status(400).json({ error: 'Invalid signature' });
}

const order = await razorpay.orders.fetch(orderId);
const purchasedTier = order.notes?.tier;
if (!purchasedTier) return res.status(500).json({ error: 'Could not determine purchased tier' });

const { error } = await supabase.auth.admin.updateUserById(userId, {
user_metadata: { tier: purchasedTier, premium: true }
});
if (error) return res.status(500).json({ error: error.message });

return res.status(200).json({ success: true });
}

return res.status(405).json({ error: 'Method not allowed' });


};
