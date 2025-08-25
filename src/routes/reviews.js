const express = require('express');
const { auth } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');
const Booking = require('../models/Booking');

const router = express.Router();

router.post('/', auth,
	body('bookingId').notEmpty(),
	body('rating').isInt({ min: 1, max: 5 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		try {
			const booking = await Booking.findById(req.body.bookingId);
			if (!booking) return res.status(404).json({ message: 'Booking not found' });
			const review = await Review.create({ ...req.body, reviewerId: req.user.id });
			return res.status(201).json(review);
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
	}
);

router.get('/:carId', async (req, res) => {
	try {
		const bookings = await Booking.find({ carId: req.params.carId }).select('_id');
		const reviews = await Review.find({ bookingId: { $in: bookings.map(b => b._id) } }).sort({ createdAt: -1 });
		return res.json(reviews);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

module.exports = router;
