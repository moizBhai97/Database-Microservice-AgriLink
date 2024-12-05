const Payment = require('../models/Payment');

const paymentController = {
    async getAllPayments(req, res, next) {
        try {
            const payments = await Payment.find();
            res.json(payments);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getPaymentById(req, res, next) {
        try {
            const payment = await Payment.findById(req.params.id);
            if (!payment) {
                return next({ status: 404, message: 'Payment not found' });
            }
            res.json(payment);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createPayment(req, res, next) {
        try {
            const { transaction, amount, paymentDate, paymentMethod, paymentStatus, escrow, escrowStatus, escrowReleaseConditions } = req.body;
            const payment = new Payment({ transaction, amount, paymentDate, paymentMethod, paymentStatus, escrow, escrowStatus, escrowReleaseConditions });
            await payment.save();
            res.status(201).json(payment);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updatePayment(req, res, next) {
        try {
            const { transaction, amount, paymentDate, paymentMethod, paymentStatus, escrow, escrowStatus, escrowReleaseConditions } = req.body;
            const payment = await Payment.findByIdAndUpdate(
                req.params.id,
                { transaction, amount, paymentDate, paymentMethod, paymentStatus, escrow, escrowStatus, escrowReleaseConditions },
                { new: true, runValidators: true }
            );
            if (!payment) {
                return next({ status: 404, message: 'Payment not found' });
            }
            res.json(payment);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deletePayment(req, res, next) {
        try {
            const payment = await Payment.findByIdAndDelete(req.params.id);
            if (!payment) {
                return next({ status: 404, message: 'Payment not found' });
            }
            res.json(payment);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = paymentController;