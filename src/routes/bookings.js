const express = require('express');
const { auth } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');

const router = express.Router();

router.post('/', auth,
	body('carId').notEmpty(),
	body('renterId').notEmpty(),
	body('ownerId').notEmpty(),
	body('startDate').isISO8601(),
	body('endDate').isISO8601(),
	body('totalPrice').isNumeric(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		try {
			const { startDate, endDate } = req.body;
			if (new Date(startDate) >= new Date(endDate)) {
				return res.status(400).json({ message: 'Invalid date range' });
			}
			const booking = await Booking.create(req.body);
			return res.status(201).json(booking);
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
	}
);

router.get('/owner/:id', auth, async (req, res) => {
	try {
		if (req.user.id !== req.params.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
		const list = await Booking.find({ ownerId: req.params.id }).sort({ createdAt: -1 });
		return res.json(list);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

router.get('/renter/:id', auth, async (req, res) => {
	try {
		if (req.user.id !== req.params.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
		const list = await Booking.find({ renterId: req.params.id }).sort({ createdAt: -1 });
		return res.json(list);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

router.put('/:id', auth, body('status').isIn(['pending','confirmed','completed','cancelled']), async (req, res) => {
	try {
		const booking = await Booking.findById(req.params.id);
		if (!booking) return res.status(404).json({ message: 'Booking not found' });
		if (String(booking.ownerId) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
		booking.status = req.body.status;
		await booking.save();
		return res.json(booking);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

module.exports = router;
