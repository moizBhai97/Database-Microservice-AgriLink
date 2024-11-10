const express = require('express');
const logisticsRequestController = require('../controllers/logisticsRequestController');

const router = express.Router();

router.route('/')
    .get(logisticsRequestController.getAllRequests)
    .post(logisticsRequestController.createRequest);

router.route('/:id')
    .get(logisticsRequestController.getRequestById)
    .put(logisticsRequestController.updateRequest)
    .delete(logisticsRequestController.deleteRequest);

module.exports = router;