const mongoose = require('mongoose');

const LoanRepaymentMonitoringSchema = new mongoose.Schema({
    loan: { type: mongoose.Schema.Types.ObjectId, ref: 'LoanApplication', required: true, index: true },
    repaymentDate: { type: Date, required: true },
    amountPaid: { type: Number, required: true },
    remainingBalance: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending', required: true },
}, { timestamps: true });

module.exports = mongoose.model('LoanRepaymentMonitoring', LoanRepaymentMonitoringSchema);