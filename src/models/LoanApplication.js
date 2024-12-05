const mongoose = require('mongoose');

const LoanApplicationSchema = new mongoose.Schema({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProfile', required: true, index: true },
    loanAmount: { type: Number, required: true },
    applicationDate: { type: Date, default: Date.now },
    loanPurpose: { type: String },
    interestRate: { type: Number, min: 0, max: 100 },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', required: true },
}, { timestamps: true });

module.exports = mongoose.model('LoanApplication', LoanApplicationSchema);