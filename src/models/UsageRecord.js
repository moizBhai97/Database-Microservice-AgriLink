const mongoose = require('mongoose');

const WeatherConditionsSchema = new mongoose.Schema({
    temperature: { type: Number },
    humidity: { type: Number },
});

const UsageRecordSchema = new mongoose.Schema({
    resource: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ProductCatalog', index: true },
    amountUsed: { type: Number, required: true, min: 0 },
    dateOfUsage: { type: Date, default: Date.now },
    purpose: { type: String },
    complianceChecked: { type: Boolean, default: false },
    weatherConditions: WeatherConditionsSchema,
    notes: { type: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model('UsageRecord', UsageRecordSchema);
