const mongoose = require('mongoose');

const LabelSchema = new mongoose.Schema({
    label: { type: String, required: true },
    labeledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProfile', required: true },
    labeledAt: { type: Date, default: Date.now }
});

const CropImageSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProfile', required: true, index: true },
    status: { type: String, enum: ['unlabeled', 'labeled', 'validated', 'completed'], default: 'unlabeled' },
    labels: [LabelSchema],
    validatedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProfile' }],
    validationCount: { type: Number, default: 0 },
    finalLabel: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('CropImage', CropImageSchema);