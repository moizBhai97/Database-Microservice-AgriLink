const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    transactionDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);