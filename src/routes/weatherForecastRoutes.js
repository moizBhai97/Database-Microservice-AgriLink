const express = require('express');
const weatherForecastController = require('../controllers/weatherForecastController');

const router = express.Router();

router.route('/')
    .get(weatherForecastController.getAllWeatherForecasts)
    .post(weatherForecastController.createWeatherForecast);

router.route('/:id')
    .get(weatherForecastController.getWeatherForecastById)
    .put(weatherForecastController.updateWeatherForecast)
    .delete(weatherForecastController.deleteWeatherForecast);

module.exports = router;