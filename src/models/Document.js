const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    fileType: { type: String, enum: ['pdf', 'jpg', 'png'], required: true },
    fileSize: { type: Number, min: 0 },
    fileUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    metadata: {
        originalName: { type: String },
        mimeType: { type: String },
    },
}, { timestamps: true });

module.exports = mongoose.model('Document', DocumentSchema);
