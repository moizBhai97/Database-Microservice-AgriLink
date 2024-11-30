const Order = require('../models/Order');
const Product = require('../models/ProductCatalog');

const orderController = {
    // Get all orders
    async getAllOrders(req, res, next) {
        try {
            const orders = await Order.find()
                .populate('buyer', 'username personalDetails') //buyerdetaiols
                .populate('items.product', 'productName details'); //productdetails
            res.json(orders);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Get order by ID
    async getOrderById(req, res, next) {
        try {
            const order = await Order.findById(req.params.id)
                .populate('buyer', 'username personalDetails')
                .populate('items.product', 'productName details');
            if (!order) {
                return next({ status: 404, message: 'Order not found' });
            }
            res.json(order);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Create a new order
    async createOrder(req, res, next) {
        try {
            const { buyer, items, deliveryDate, status } = req.body;

            // Calculate total amount
            let totalAmount = 0;
            for (const item of items) {
                const product = await Product.findById(item.product);
                if (!product) {
                    return next({ status: 400, message: `Product with ID ${item.product} not found` });
                }
                totalAmount += product.details.price * item.quantity;
            }

            // Create order
            const order = new Order({
                buyer,
                items,
                deliveryDate,
                status,
                totalAmount,
            });

            await order.save();
            res.status(201).json(order);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Update an order
    async updateOrder(req, res, next) {
        try {
            const updates = req.body;
            const order = await Order.findByIdAndUpdate(req.params.id, updates, {
                new: true,
                runValidators: true,
            })
                .populate('buyer', 'username personalDetails')
                .populate('items.product', 'productName details');

            if (!order) {
                return next({ status: 404, message: 'Order not found' });
            }
            res.json(order);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Delete an order
    async deleteOrder(req, res, next) {
        try {
            const order = await Order.findByIdAndDelete(req.params.id);
            if (!order) {
                return next({ status: 404, message: 'Order not found' });
            }
            res.json({ message: 'Order deleted successfully', order });
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
};

module.exports = orderController;
