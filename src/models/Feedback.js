const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    content: { type: String, required: true, minlenght: 1 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    category: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);