const mongoose = require('mongoose');

const SuggestedAction = new mongoose.Schema({
    resource: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    usageInstructions: { type: String },
});

const CropDiagnosisSchema = new mongoose.Schema({
    cropImage: { type: mongoose.Schema.Types.ObjectId, ref: 'CropImage', required: true, index: true },
    healthStatus: { type: String, required: true, enum: ['healthy', 'diseased', 'unknown'] },
    predictedDiseases: [String],
    suggestedActions: [SuggestedAction],
}, { timestamps: true });

module.exports = mongoose.model('CropDiagnosis', CropDiagnosisSchema);
