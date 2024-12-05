const Transaction = require('../models/Transaction');

const transactionController = {
    async getAllTransactions(req, res, next) {
        try {
            const transactions = await Transaction.find();
            res.json(transactions);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getTransactionById(req, res, next) {
        try {
            const transaction = await Transaction.findById(req.params.id);
            if (!transaction) {
                return next({ status: 404, message: 'Transaction not found' });
            }
            res.json(transaction);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createTransaction(req, res, next) {
        try {
            const { buyer, seller, product, quantity, totalPrice, status } = req.body;
            const transaction = new Transaction({ buyer, seller, product, quantity, totalPrice, status });
            await transaction.save();
            res.status(201).json(transaction);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateTransaction(req, res, next) {
        try {
            const { buyer, seller, product, quantity, totalPrice, status } = req.body;
            const transaction = await Transaction.findByIdAndUpdate(
                req.params.id,
                { buyer, seller, product, quantity, totalPrice, status },
                { new: true, runValidators: true }
            );
            if (!transaction) {
                return next({ status: 404, message: 'Transaction not found' });
            }
            res.json(transaction);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteTransaction(req, res, next) {
        try {
            const transaction = await Transaction.findByIdAndDelete(req.params.id);
            if (!transaction) {
                return next({ status: 404, message: 'Transaction not found' });
            }
            res.json(transaction);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = transactionController;