const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    equipmentType: { type: String, required: true },
    description: { type: String },
    rentalPricePerDay: { type: Number, required: true, min: 0 },
    availabilityStatus: {
        type: String,
        enum: ['available', 'rented', 'unavailable'],
        required: true,
        default: 'available',
    },
    location: { type: String, required: true },
    specifications: { type: String },
    images: [{ type: String }], // URLs to images
}, { timestamps: true });

module.exports = mongoose.model('Equipment', EquipmentSchema);
