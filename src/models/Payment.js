const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    transaction: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true, index: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
    paymentMethod: { type: String },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
    escrow: { type: Boolean, default: true },
    escrowStatus: { type: String, enum: ['Pending', 'Released', 'Cancelled'], default: 'Pending' },
    escrowReleaseConditions: {
        allPartiesConfirmed: { type: Boolean, default: false },
        transactionVerified: { type: Boolean, default: false }
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);