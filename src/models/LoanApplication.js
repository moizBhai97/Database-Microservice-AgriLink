const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const loanApplicationSchema = new mongoose.Schema({
    applicationId: { type: String, default: uuidv4 },
    farmerId: { type: String, required: true },
    loanAmount: { type: Number, required: true, min: 0 },
    applicationDate: { type: Date, required: true },
    loanPurpose: { type: String, minlenght: 1 },
    interestRate: { type: Number, min: 0, max: 100 },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], required: true, default: 'pending' },
});

module.exports = mongoose.model('LoanApplication', loanApplicationSchema);
