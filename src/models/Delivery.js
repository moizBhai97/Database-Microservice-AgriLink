const mongoose = require('mongoose');

const { Schema } = mongoose;

const LocationSchema = new Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String, required: true }
});

const LogisticsRequestSchema = new Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    equipment: { type: Schema.Types.ObjectId, ref: 'Equipment' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    pickupLocation: LocationSchema,
    deliveryLocation: LocationSchema,
    scheduledPickupDate: { type: Date, required: true },
    scheduledDeliveryDate: { type: Date, required: true },
    status: { type: String, enum: ['scheduled', 'in_transit', 'delivered'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('LogisticsRequest', LogisticsRequestSchema);