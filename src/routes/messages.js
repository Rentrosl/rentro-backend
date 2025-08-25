const express = require('express');
const { auth } = require('../middleware/auth');
const { Message } = require('../models/Message');

const router = express.Router();

router.post('/', auth, async (req, res) => {
	try {
		const msg = await Message.create({ ...req.body, senderId: req.user.id });
		return res.status(201).json(msg);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

router.get('/:conversationId', auth, async (req, res) => {
	try {
		const list = await Message.find({ conversationId: req.params.conversationId }).sort({ createdAt: 1 });
		return res.json(list);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

module.exports = router;
