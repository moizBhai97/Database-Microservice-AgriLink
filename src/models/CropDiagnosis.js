const mongoose = require('mongoose');

const CropDiagnosisSchema = new mongoose.Schema({
    cropImage: { type: mongoose.Schema.Types.ObjectId, ref: 'CropImage', required: true, index: true },
    predictedDisease: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('CropDiagnosis', CropDiagnosisSchema);
