const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);
