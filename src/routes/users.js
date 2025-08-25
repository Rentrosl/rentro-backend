const express = require('express');
const { body } = require('express-validator');
const { auth } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/:id', auth, async (req, res) => {
	try {
		if (req.user.id !== req.params.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
		const user = await User.findById(req.params.id).select('-password');
		if (!user) return res.status(404).json({ message: 'User not found' });
		return res.json(user);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

router.put('/:id', auth,
	body('email').optional().isEmail(),
	async (req, res) => {
		try {
			if (req.user.id !== req.params.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
			const updates = { ...req.body };
			delete updates.password; // password changes should go through a dedicated route
			const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
			return res.json(user);
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
	}
);

module.exports = router;
