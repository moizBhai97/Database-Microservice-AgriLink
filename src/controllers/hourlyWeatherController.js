const HourlyWeather = require('../models/HourlyWeather');

const hourlyWeatherController = {
    async getAllHourlyWeather(req, res, next) {
        try {
            const hourlyWeather = await HourlyWeather.find();
            res.json(hourlyWeather);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getHourlyWeatherById(req, res, next) {
        try {
            const hourlyWeather = await HourlyWeather.findById(req.params.id);
            if (!hourlyWeather) {
                return next({ status: 404, message: 'HourlyWeather not found' });
            }
            res.json(hourlyWeather);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createHourlyWeather(req, res, next) {
        try {
            const { current, forecast } = req.body;
            const hourlyWeather = new HourlyWeather({ current, forecast });
            await hourlyWeather.save();
            res.status(201).json(hourlyWeather);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateHourlyWeather(req, res, next) {
        try {
            const { current, forecast } = req.body;
            const hourlyWeather = await HourlyWeather.findByIdAndUpdate(
                req.params.id,
                { current, forecast },
                { new: true, runValidators: true }
            );
            if (!hourlyWeather) {
                return next({ status: 404, message: 'HourlyWeather not found' });
            }
            res.json(hourlyWeather);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteHourlyWeather(req, res, next) {
        try {
            const hourlyWeather = await HourlyWeather.findByIdAndDelete(req.params.id);
            if (!hourlyWeather) {
                return next({ status: 404, message: 'HourlyWeather not found' });
            }
            res.json(hourlyWeather);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = hourlyWeatherController;