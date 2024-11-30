const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Get all orders and create a new order
router.route('/')
    .get(orderController.getAllOrders)
    .post(orderController.createOrder);

// Get, update, or delete a specific order
router.route('/:id')
    .get(orderController.getOrderById)
    .put(orderController.updateOrder)
    .delete(orderController.deleteOrder);

module.exports = router;
