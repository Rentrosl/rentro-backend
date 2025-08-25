const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
	bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
	ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	renterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	amount: { type: Number, required: true },
	status: { type: String, enum: ['paid', 'pending', 'failed'], default: 'pending' },
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
