const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
    {
        reviewType: {
            type: String,
            required: true,
            enum: ['Equipment', 'Product']
        },
        reviewFor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'reviewType'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Review', ReviewSchema);