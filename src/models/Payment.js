const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    currency: { type: String, required: true },
}, { timestamps: true });

const paymentSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    amount: { type: Number, required: true },
    paymentMethod: { type: String },
    paymentStatus: { type: String, enum: ["pending", "completed", "failed"], required: true },
    transaction: { type: transactionSchema, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
