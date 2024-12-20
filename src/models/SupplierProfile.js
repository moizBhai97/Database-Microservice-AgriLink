const mongoose = require('mongoose');

const LogisticsSchema = new mongoose.Schema({
    deliveryAreas: { type: [String], required: true },
    averageDeliveryTime: { type: Number, min: 0 },
});

const SupplierProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    logistics: { type: LogisticsSchema, required: true },
}, { timestamps: true });

module.exports = mongoose.model('SupplierProfile', SupplierProfileSchema);
