const Transaction = require('../models/Transaction');
const Payment = require('../models/Payment');

const transactionController = {
    // Create a transaction and a corresponding payment
    async createTransaction(req, res, next) {
        try {
            const { buyerId, sellerId, productId, quantity, totalPrice, transactionDate, status } = req.body;

            // Create and save the transaction
            const transaction = new Transaction({
                buyerId,
                sellerId,
                productId,
                quantity,
                totalPrice,
                transactionDate,
                status,
            });

            await transaction.save();

            // Create and save the corresponding payment
            const payment = new Payment({
                transactionId: transaction.transactionId,
                amount: totalPrice,
                paymentStatus: 'pending',
                paymentDate: transactionDate,
                paymentMethod: 'credit card',
            });

            await payment.save();

            res.status(201).json({ transaction, payment });
        } catch (error) {
            next({ status: 400, message: error.message });
        }
    },

    // Retrieve all transactions
    async getAllTransactions(req, res, next) {
        try {
            const transactions = await Transaction.find();
            res.json(transactions);
        } catch (error) {
            next({ status: 500, message: error.message });
        }
    },

    // Retrieve a transaction by ID
    async getTransactionById(req, res, next) {
        try {
            const transaction = await Transaction.findById(req.params.id);
            if (!transaction) return next({ status: 404, message: 'Transaction not found' });
            res.json(transaction);
        } catch (error) {
            next({ status: 500, message: error.message });
        }
    },

    // Update a transaction by ID
    async updateTransaction(req, res, next) {
        try {
            const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!transaction) return next({ status: 404, message: 'Transaction not found' });
            res.json(transaction);
        } catch (error) {
            next({ status: 400, message: error.message });
        }
    },

    // Delete a transaction by ID
    async deleteTransaction(req, res, next) {
        try {
            const transaction = await Transaction.findByIdAndDelete(req.params.id);
            if (!transaction) return next({ status: 404, message: 'Transaction not found' });
            res.json({ message: 'Transaction deleted successfully', transaction });
        } catch (error) {
            next({ status: 500, message: error.message });
        }
    },

    // Confirm a transaction
    async confirmTransaction(req, res, next) {
        try {
            const { transactionId } = req.body;
            const transaction = await Transaction.findById(transactionId);
            if (!transaction) return next({ status: 404, message: 'Transaction not found' });

            transaction.status = 'completed';
            await transaction.save();

            res.status(200).json({ message: 'Transaction confirmed successfully', transaction });
        } catch (error) {
            next({ status: 500, message: error.message });
        }
    },
};

module.exports = transactionController;
