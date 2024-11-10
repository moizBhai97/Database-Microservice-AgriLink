const mongoose = require('mongoose');

const PriceDetailsSchema = new mongoose.Schema({
    minimumPrice: { type: Number, required: true },
    maximumPrice: { type: Number, required: true },
    description: { type: String },
});

const PriceListSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    type: {
        type: String,
        enum: ['Seed', 'Pesticide', 'Fertilizer', 'Livestock'],
        required: true,
    },
    date: { type: Date, default: Date.now },
    city: { type: String },
    province: { type: String },
    priceDetails: PriceDetailsSchema,
}, { timestamps: true });

module.exports = mongoose.model('PriceList', PriceListSchema);