const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
	conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
	senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	message: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
});

const ConversationSchema = new mongoose.Schema({
	participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	updatedAt: { type: Date, default: Date.now }
});

module.exports = {
	Message: mongoose.model('Message', MessageSchema),
	Conversation: mongoose.model('Conversation', ConversationSchema)
};
