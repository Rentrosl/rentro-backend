const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { signToken } = require('../middleware/auth');

const router = express.Router();

router.post('/signup',
	body('name').notEmpty(),
	body('email').isEmail(),
	body('password').isLength({ min: 6 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		try {
			const exists = await User.findOne({ email: req.body.email });
			if (exists) return res.status(409).json({ message: 'Email already in use' });
			const user = await User.create(req.body);
			const token = signToken({ id: user._id, role: user.role });
			return res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
	}
);

router.post('/login',
	body('email').isEmail(),
	body('password').notEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		try {
			const user = await User.findOne({ email: req.body.email }).select('+password');
			if (!user) return res.status(401).json({ message: 'Invalid credentials' });
			const ok = await user.comparePassword(req.body.password);
			if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
			const token = signToken({ id: user._id, role: user.role });
			return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
	}
);

router.post('/logout', (_req, res) => {
	// On client remove token; here we just acknowledge
	return res.json({ message: 'Logged out' });
});

module.exports = router;
