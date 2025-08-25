const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
	carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
	renterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
	totalPrice: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
