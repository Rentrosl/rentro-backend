const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
	ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	images: [{ type: String }],
	pricePerDay: { type: Number, required: true },
	location: { type: String, required: true },
	type: { type: String, enum: ['sedan', 'suv', 'hatchback', 'luxury', 'van'], required: true },
	transmission: { type: String, enum: ['manual', 'automatic'], required: true },
	fuel: { type: String, enum: ['petrol', 'diesel', 'hybrid', 'electric'], required: true },
	seats: { type: Number, min: 2, max: 8, required: true },
	availability: [{ type: Date }],
	status: { type: String, enum: ['active', 'pending', 'inactive'], default: 'pending' },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Car', CarSchema);
