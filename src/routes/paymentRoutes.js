const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

router.post('/', paymentController.createPayment); // Create a new payment
router.get('/', paymentController.getAllPayments); // Get all payments
router.get('/:id', paymentController.getPaymentById); // Get a payment by ID
router.put('/:id', paymentController.updatePayment); // Update a payment by ID
router.delete('/:id', paymentController.deletePayment); // Delete a payment by ID
router.post('/repay', paymentController.processRepayment); // Process a loan repayment
router.post('/make-payment', paymentController.makePayment); // Make a payment via Stripe

module.exports = router;
