const WeatherHistory = require('../models/WeatherHistory');

const weatherHistoryController = {
    async getAllWeatherHistories(req, res, next) {
        try {
            const weatherHistories = await WeatherHistory.find();
            res.json(weatherHistories);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getWeatherHistoryById(req, res, next) {
        try {
            const weatherHistory = await WeatherHistory.findById(req.params.id);
            if (!weatherHistory) {
                return next({ status: 404, message: 'WeatherHistory not found' });
            }
            res.json(weatherHistory);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createWeatherHistory(req, res, next) {
        try {
            const { forecast } = req.body;
            const weatherHistory = new WeatherHistory({ forecast });
            await weatherHistory.save();
            res.status(201).json(weatherHistory);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateWeatherHistory(req, res, next) {
        try {
            const { forecast } = req.body;
            const weatherHistory = await WeatherHistory.findByIdAndUpdate(
                req.params.id,
                { forecast },
                { new: true, runValidators: true }
            );
            if (!weatherHistory) {
                return next({ status: 404, message: 'WeatherHistory not found' });
            }
            res.json(weatherHistory);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteWeatherHistory(req, res, next) {
        try {
            const weatherHistory = await WeatherHistory.findByIdAndDelete(req.params.id);
            if (!weatherHistory) {
                return next({ status: 404, message: 'WeatherHistory not found' });
            }
            res.json(weatherHistory);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = weatherHistoryController;