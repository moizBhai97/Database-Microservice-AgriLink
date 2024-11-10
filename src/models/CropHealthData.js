const mongoose = require('mongoose');

const HealthMetricsSchema = new mongoose.Schema({
    soilMoisture: { type: Number, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    pestPresence: { type: Boolean, required: true },
});

const CropHealthDataSchema = new mongoose.Schema({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProfile', required: true, index: true },
    field: { type: mongoose.Schema.Types.ObjectId, ref: 'Field', required: true, index: true },
    healthMetrics: { type: HealthMetricsSchema, required: true },
}, { timestamps: true });

module.exports = mongoose.model('CropHealthData', CropHealthDataSchema);
