const express = require('express');
const { auth } = require('../middleware/auth');
const Transaction = require('../models/Transaction');

const router = express.Router();

router.get('/owner/:id', auth, async (req, res) => {
	try {
		if (req.user.id !== req.params.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
		const tx = await Transaction.find({ ownerId: req.params.id });
		const totalEarnings = tx.filter(t => t.status === 'paid').reduce((sum, t) => sum + t.amount, 0);
		const pendingPayouts = tx.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);
		const monthly = {};
		tx.forEach(t => {
			const key = `${t.date.getFullYear()}-${t.date.getMonth()+1}`;
			monthly[key] = (monthly[key] || 0) + (t.status === 'paid' ? t.amount : 0);
		});
		return res.json({ totalEarnings, pendingPayouts, monthly });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

module.exports = router;
