const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const loanRepaymentMonitoringSchema = new mongoose.Schema({
    monitoringId: { type: String, default: uuidv4 },
    loanId: { type: String, required: true },
    repaymentDate: { type: Date, required: true },
    amountPaid: { type: Number, required: true },
    remainingBalance: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
});

module.exports = mongoose.model('LoanRepaymentMonitoring', loanRepaymentMonitoringSchema);
