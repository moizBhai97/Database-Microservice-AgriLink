const express = require('express');
const cropHealthDataController = require('../controllers/cropHealthDataController');

const router = express.Router();

router.route('/')
    .get(cropHealthDataController.getAllHealthData)
    .post(cropHealthDataController.createHealthData);

router.route('/:id')
    .get(cropHealthDataController.getHealthDataById)
    .put(cropHealthDataController.updateHealthData)
    .delete(cropHealthDataController.deleteHealthData);

module.exports = router;