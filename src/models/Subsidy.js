const mongoose = require('mongoose');

const SubsidySchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 1, index: true },
    category: { type: String, required: true },
    region: { type: String, required: true },
    description: { type: String, required: true },
    applicationDeadline: { type: Date, required: true },
    amount: { type: Number, required: true, min: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'GovernmentOfficial', index: true },
}, { timestamps: true });

module.exports = mongoose.model('Subsidy', SubsidySchema);
