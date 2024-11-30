const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

// Get all payments and create a new payment
router.route('/')
    .get(paymentController.getAllPayments)
    .post(paymentController.createPayment);

// Get, update, or delete a specific payment
router.route('/:id')
    .get(paymentController.getPaymentById)
    .put(paymentController.updatePayment)
    .delete(paymentController.deletePayment);

module.exports = router;
