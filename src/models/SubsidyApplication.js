const mongoose = require('mongoose');

const SubsidyApplicationSchema = new mongoose.Schema({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProfile', required: true },
    subsidy: { type: mongoose.Schema.Types.ObjectId, ref: 'Subsidy', required: true },
    applicationDate: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        required: true,
    },
    supportingDocuments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
}, { timestamps: true });

module.exports = mongoose.model('SubsidyApplication', SubsidyApplicationSchema);
