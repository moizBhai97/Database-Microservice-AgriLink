const mongoose = require('mongoose');

const LoanApplicationSchema = new mongoose.Schema({
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProfile', required: true },
    amountRequested: { type: Number, required: true },
    purpose: { type: String, required: true },
    interestRate: { type: Number, min: 0, max: 100 },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        required: true,
    },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
}, { timestamps: true });

module.exports = mongoose.model('LoanApplication', LoanApplicationSchema);
