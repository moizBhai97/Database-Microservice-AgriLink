const mongoose = require('mongoose');

const { Schema } = mongoose;

const LocationSchema = new Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String, required: true }
});

const LogisticsRequestSchema = new Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    itemType: {
        type: String,
        required: true,
        enum: ['Equipment', 'Product']
    },
    item: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'itemType',
        index: true
    },
    pickupLocation: LocationSchema,
    deliveryLocation: LocationSchema,
    scheduledPickupDate: { type: Date, required: true },
    scheduledDeliveryDate: { type: Date, required: true },
    status: { type: String, enum: ['scheduled', 'in_transit', 'delivered'], required: true, default: 'scheduled' },
}, { timestamps: true });

module.exports = mongoose.model('LogisticsRequest', LogisticsRequestSchema);