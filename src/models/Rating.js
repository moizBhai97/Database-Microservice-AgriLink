const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    value: { type: Number, required: true, min: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    ratedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
}, { timestamps: true });

module.exports = mongoose.model('Rating', RatingSchema);
