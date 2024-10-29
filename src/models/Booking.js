const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookingDetailsSchema = new Schema({
    equipment: { type: Schema.Types.ObjectId, ref: 'Equipment', required: true },
    renter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rentalPeriod: {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true }
    },
    totalPrice: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('BookingDetails', BookingDetailsSchema);