const mongoose = require('mongoose');

const SubsidyApplicationSchema = new mongoose.Schema({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProfile', required: true, index: true },
    subsidy: { type: mongoose.Schema.Types.ObjectId, ref: 'Subsidy', required: true, index: true },
    applicationDate: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        required: true,
        default: 'pending',
    },
    supportingDocuments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
    rejectionReason: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('SubsidyApplication', SubsidyApplicationSchema);
