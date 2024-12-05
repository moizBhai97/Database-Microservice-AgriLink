const mongoose = require('mongoose');

const LabelSchema = new mongoose.Schema({
    label: { type: String },
    labeledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProfile', index: true },
    labeledAt: { type: Date, default: Date.now },
    isDropped: { type: Boolean, default: false },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProfile' }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProfile' }],
});

const CropImageSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    cropName: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProfile', required: true, index: true },
    status: { type: String, enum: ['unlabeled', 'labeled', 'validated'], default: 'unlabeled' },
    labels: { type: [LabelSchema], default: [] },
    finalLabel: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('CropImage', CropImageSchema);