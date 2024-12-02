const mongoose = require('mongoose');

const SubsidySchema = new mongoose.Schema({
    title: { type: String, required: true }, //shouldnt sub title be unique?
    category: { type: String, required: true },
    region: { type: String, required: true },
    description: { type: String, required: true },
    applicationDeadline: { type: Date, required: true },
    amount: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'GovernmentOfficial' },
}, { timestamps: true });

module.exports = mongoose.model('Subsidy', SubsidySchema);
