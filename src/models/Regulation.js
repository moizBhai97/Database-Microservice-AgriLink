const mongoose = require('mongoose');

const RegulationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    effectiveDate: { type: Date, required: true },
    category: {
        type: String,
        enum: ['pesticide', 'land_management', 'crop_protection', 'other'],
        required: true,
    },
    type: { type: String, required: true },
    bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProfile' }],
}, { timestamps: true });

module.exports = mongoose.model('Regulation', RegulationSchema);
