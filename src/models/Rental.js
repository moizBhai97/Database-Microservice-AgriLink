const mongoose = require('mongoose');
const { Schema } = mongoose;

const RentalSchema = new mongoose.Schema({
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    renter: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    equipment: {
        type: Schema.Types.ObjectId,
        ref: 'Equipment',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Rental', RentalSchema);
