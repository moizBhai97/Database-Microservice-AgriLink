const express = require('express');
const weatherHistoryController = require('../controllers/weatherHistoryController');

const router = express.Router();

router.route('/')
    .get(weatherHistoryController.getAllWeatherHistories)
    .post(weatherHistoryController.createWeatherHistory);

router.route('/:id')
    .get(weatherHistoryController.getWeatherHistoryById)
    .put(weatherHistoryController.updateWeatherHistory)
    .delete(weatherHistoryController.deleteWeatherHistory);

module.exports = router;