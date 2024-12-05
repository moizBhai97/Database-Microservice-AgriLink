const LogisticsRequest = require('../models/Delivery');

const logisticsRequestController = {
    async getAllRequests(req, res, next) {
        try {
            const requests = await LogisticsRequest.find();
            res.json(requests);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getRequestById(req, res, next) {
        try {
            const request = await LogisticsRequest.findById(req.params.id);
            if (!request) {
                return next({ status: 404, message: 'Request not found' });
            }
            res.json(request);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createRequest(req, res, next) {
        try {
            const { requester, itemType, item, pickupLocation, deliveryLocation, scheduledPickupDate, scheduledDeliveryDate, status } = req.body;
            const request = new LogisticsRequest({ requester, itemType, item, pickupLocation, deliveryLocation, scheduledPickupDate, scheduledDeliveryDate, status });
            await request.save();
            res.status(201).json(request);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateRequest(req, res, next) {
        try {
            const { requester, itemType, item, pickupLocation, deliveryLocation, scheduledPickupDate, scheduledDeliveryDate, status } = req.body;
            const request = await LogisticsRequest.findByIdAndUpdate(
                req.params.id,
                { requester, itemType, item, pickupLocation, deliveryLocation, scheduledPickupDate, scheduledDeliveryDate, status },
                { new: true, runValidators: true }
            );
            if (!request) {
                return next({ status: 404, message: 'Request not found' });
            }
            res.json(request);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteRequest(req, res, next) {
        try {
            const request = await LogisticsRequest.findByIdAndDelete(req.params.id);
            if (!request) {
                return next({ status: 404, message: 'Request not found' });
            }
            res.json(request);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = logisticsRequestController;