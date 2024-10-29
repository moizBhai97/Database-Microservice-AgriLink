const mongoose = require('mongoose');

const CropImageSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProfile', required: true },
    status: { type: String, enum: ['pending', 'analyzed', 'verified'], default: 'pending' },
    healthLabel: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('CropImage', CropImageSchema);
