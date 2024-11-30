const Payment = require('../models/Payment');
const Order = require('../models/Order');
const BookingDetails = require('../models/Booking');

const paymentController = {
    // Get all payments
    async getAllPayments(req, res, next) {
        try {
            const payments = await Payment.find()
                .populate('order', 'items totalAmount status')
                .populate('booking', 'equipment renter owner rentalPeriod totalPrice')
                .populate('transaction.from', 'username personalDetails')
                .populate('transaction.to', 'username personalDetails');
            res.json(payments);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Get a specific payment by ID
    async getPaymentById(req, res, next) {
        try {
            const payment = await Payment.findById(req.params.id)
                .populate('order', 'items totalAmount status')
                .populate('booking', 'equipment renter owner rentalPeriod totalPrice')
                .populate('transaction.from', 'username personalDetails')
                .populate('transaction.to', 'username personalDetails');
            if (!payment) {
                return next({ status: 404, message: 'Payment not found' });
            }
            res.json(payment);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Create a new payment
    async createPayment(req, res, next) {
        try {
            const { order, booking, amount, paymentMethod, paymentStatus, transaction } = req.body;

            // Validation: Either an order or booking must be associated
            if (!order && !booking) {
                return next({ status: 400, message: 'Either order or booking must be specified' });
            }

            // Create and save the payment
            const payment = new Payment({
                order,
                booking,
                amount,
                paymentMethod,
                paymentStatus,
                transaction,
            });

            await payment.save();
            res.status(201).json(payment);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Update a payment
    async updatePayment(req, res, next) {
        try {
            const updates = req.body;
            const payment = await Payment.findByIdAndUpdate(req.params.id, updates, {
                new: true,
                runValidators: true,
            })
                .populate('order', 'items totalAmount status')
                .populate('booking', 'equipment renter owner rentalPeriod totalPrice')
                .populate('transaction.from', 'username personalDetails')
                .populate('transaction.to', 'username personalDetails');
            if (!payment) {
                return next({ status: 404, message: 'Payment not found' });
            }
            res.json(payment);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Delete a payment
    async deletePayment(req, res, next) {
        try {
            const payment = await Payment.findByIdAndDelete(req.params.id);
            if (!payment) {
                return next({ status: 404, message: 'Payment not found' });
            }
            res.json({ message: 'Payment deleted successfully', payment });
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
};

module.exports = paymentController;
