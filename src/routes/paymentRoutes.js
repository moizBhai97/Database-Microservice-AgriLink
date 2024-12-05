const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.route('/')
    .get(paymentController.getAllPayments)
    .post(paymentController.createPayment);

router.route('/:id')
    .get(paymentController.getPaymentById)
    .put(paymentController.updatePayment)
    .delete(paymentController.deletePayment);

module.exports = router;