const express = require('express');
const hourlyWeatherController = require('../controllers/hourlyWeatherController');

const router = express.Router();

router.route('/')
    .get(hourlyWeatherController.getAllHourlyWeather)
    .post(hourlyWeatherController.createHourlyWeather);

router.route('/:id')
    .get(hourlyWeatherController.getHourlyWeatherById)
    .put(hourlyWeatherController.updateHourlyWeather)
    .delete(hourlyWeatherController.deleteHourlyWeather);

module.exports = router;