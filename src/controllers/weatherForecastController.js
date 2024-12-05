const WeatherForecast = require('../models/WeatherForecast');

const weatherForecastController = {
    async getAllWeatherForecasts(req, res, next) {
        try {
            const weatherForecasts = await WeatherForecast.find();
            res.json(weatherForecasts);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getWeatherForecastById(req, res, next) {
        try {
            const weatherForecast = await WeatherForecast.findById(req.params.id);
            if (!weatherForecast) {
                return next({ status: 404, message: 'WeatherForecast not found' });
            }
            res.json(weatherForecast);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createWeatherForecast(req, res, next) {
        try {
            const { forecast } = req.body;
            const weatherForecast = new WeatherForecast({ forecast });
            await weatherForecast.save();
            res.status(201).json(weatherForecast);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateWeatherForecast(req, res, next) {
        try {
            const { forecast } = req.body;
            const weatherForecast = await WeatherForecast.findByIdAndUpdate(
                req.params.id,
                { forecast },
                { new: true, runValidators: true }
            );
            if (!weatherForecast) {
                return next({ status: 404, message: 'WeatherForecast not found' });
            }
            res.json(weatherForecast);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteWeatherForecast(req, res, next) {
        try {
            const weatherForecast = await WeatherForecast.findByIdAndDelete(req.params.id);
            if (!weatherForecast) {
                return next({ status: 404, message: 'WeatherForecast not found' });
            }
            res.json(weatherForecast);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = weatherForecastController;