const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
});

const OrderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: { type: [OrderItemSchema], required: true },
    deliveryDate: { type: Date },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        required: true,
        default: 'pending',
    },
    totalAmount: { type: Number, min: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
