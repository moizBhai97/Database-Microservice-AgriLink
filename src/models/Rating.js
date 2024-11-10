const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    value: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ratedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Rating', RatingSchema);
