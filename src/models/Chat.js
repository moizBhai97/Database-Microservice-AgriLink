// models/Chat.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });

const ChatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }],
    messages: [MessageSchema],
    status: { type: String, enum: ['active', 'archived'], default: 'active' },
}, { timestamps: true });

ChatSchema.virtual('unreadMessagesCount').get(function () {
    return this.messages.filter(message => !message.isRead).length;
});

module.exports = mongoose.model('Chat', ChatSchema);