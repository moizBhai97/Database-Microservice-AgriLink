const CropHealthData = require('../models/CropHealthData');

const cropHealthDataController = {
    async getAllHealthData(req, res, next) {
        try {
            const healthData = await CropHealthData.find();
            res.json(healthData);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getHealthDataById(req, res, next) {
        try {
            const healthData = await CropHealthData.findById(req.params.id);
            if (!healthData) {
                return next({ status: 404, message: 'Health data not found' });
            }
            res.json(healthData);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createHealthData(req, res, next) {
        try {
            const { farmer, field, healthMetrics } = req.body;
            const healthData = new CropHealthData({ farmer, field, healthMetrics });
            await healthData.save();
            res.status(201).json(healthData);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateHealthData(req, res, next) {
        try {
            const { farmer, field, healthMetrics } = req.body;
            const healthData = await CropHealthData.findByIdAndUpdate(
                req.params.id,
                { farmer, field, healthMetrics },
                { new: true, runValidators: true }
            );
            if (!healthData) {
                return next({ status: 404, message: 'Health data not found' });
            }
            res.json(healthData);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteHealthData(req, res, next) {
        try {
            const healthData = await CropHealthData.findByIdAndDelete(req.params.id);
            if (!healthData) {
                return next({ status: 404, message: 'Health data not found' });
            }
            res.json(healthData);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = cropHealthDataController;