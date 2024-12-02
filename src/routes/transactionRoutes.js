const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

// Get all transactions and create a new transaction
router.route('/')
    .get(transactionController.getAllTransactions)
    .post(transactionController.createTransaction);

// Get, update, or delete a specific transaction by ID
router.route('/:id')
    .get(transactionController.getTransactionById)
    .put(transactionController.updateTransaction)
    .delete(transactionController.deleteTransaction);

// Confirm a transaction
router.post('/confirm', transactionController.confirmTransaction);

module.exports = router;
