// models/Chat.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });

const ChatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [MessageSchema],
    status: { type: String, enum: ['active', 'archived'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Chat', ChatSchema);