const mongoose = require('mongoose');

const ProductDetailsSchema = new mongoose.Schema({
    description: { type: String },
    unit: { type: String },
    specifications: [{ type: String }],
    price: { type: Number, min: 0 },
    quantity: { type: Number, min: 0 },
});

const ProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    category: {
        type: String,
        enum: ['Seed', 'Pesticide', 'Fertilizer', 'Livestock'],
        required: true,
    },
    details: ProductDetailsSchema,
    images: [{ type: String }], //considering urls for now
    location: { type: String, required: true },
    availabilityStatus: {
        type: String,
        enum: ['in_stock', 'out_of_stock'],
        required: true,
    },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'SupplierProfile', required: true, index: true },
}, { timestamps: true });

module.exports = mongoose.model('ProductCatalog', ProductSchema);
