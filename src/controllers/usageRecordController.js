const UsageRecord = require('../models/UsageRecord');

const usageRecordController = {
    async getAllUsageRecords(req, res, next) {
        try {
            const usageRecords = await UsageRecord.find();
            res.json(usageRecords);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getUsageRecordById(req, res, next) {
        try {
            const usageRecord = await UsageRecord.findById(req.params.id);
            if (!usageRecord) {
                return next({ status: 404, message: 'Usage record not found' });
            }
            res.json(usageRecord);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createUsageRecord(req, res, next) {
        try {
            const { resource, amountUsed, dateOfUsage, purpose, complianceChecked, weatherConditions, notes } = req.body;
            const usageRecord = new UsageRecord({ resource, amountUsed, dateOfUsage, purpose, complianceChecked, weatherConditions, notes });
            await usageRecord.save();
            res.status(201).json(usageRecord);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateUsageRecord(req, res, next) {
        try {
            const { resource, amountUsed, dateOfUsage, purpose, complianceChecked, weatherConditions, notes } = req.body;
            const usageRecord = await UsageRecord.findByIdAndUpdate(
                req.params.id,
                { resource, amountUsed, dateOfUsage, purpose, complianceChecked, weatherConditions, notes },
                { new: true, runValidators: true }
            );
            if (!usageRecord) {
                return next({ status: 404, message: 'Usage record not found' });
            }
            res.json(usageRecord);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteUsageRecord(req, res, next) {
        try {
            const usageRecord = await UsageRecord.findByIdAndDelete(req.params.id);
            if (!usageRecord) {
                return next({ status: 404, message: 'Usage record not found' });
            }
            res.json(usageRecord);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = usageRecordController;