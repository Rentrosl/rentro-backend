const express = require('express');
const { auth } = require('../middleware/auth');
const Car = require('../models/Car');

const router = express.Router();

// Create car
router.post('/', auth, async (req, res) => {
	try {
		const car = await Car.create({ ...req.body, ownerId: req.user.id, status: 'pending' });
		return res.status(201).json(car);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

// Get cars with filters
router.get('/', async (req, res) => {
	try {
		const { location, minPrice, maxPrice, type } = req.query;
		const query = {};
		if (location) query.location = new RegExp(location, 'i');
		if (type) query.type = type;
		if (minPrice || maxPrice) query.pricePerDay = {};
		if (minPrice) query.pricePerDay.$gte = Number(minPrice);
		if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
		const cars = await Car.find(query).sort({ createdAt: -1 });
		return res.json(cars);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

// Get car by id
router.get('/:id', async (req, res) => {
	try {
		const car = await Car.findById(req.params.id);
		if (!car) return res.status(404).json({ message: 'Car not found' });
		return res.json(car);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

// Update car
router.put('/:id', auth, async (req, res) => {
	try {
		const car = await Car.findById(req.params.id);
		if (!car) return res.status(404).json({ message: 'Car not found' });
		if (String(car.ownerId) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
		Object.assign(car, req.body);
		await car.save();
		return res.json(car);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

// Delete car
router.delete('/:id', auth, async (req, res) => {
	try {
		const car = await Car.findById(req.params.id);
		if (!car) return res.status(404).json({ message: 'Car not found' });
		if (String(car.ownerId) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
		await car.deleteOne();
		return res.json({ message: 'Deleted' });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

module.exports = router;
