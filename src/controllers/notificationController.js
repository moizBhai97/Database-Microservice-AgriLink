const Notification = require('../models/Notification');

const notificationController = {
    async getAllNotifications(req, res, next) {
        try {
            const notifications = await Notification.find();
            res.json(notifications);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getNotificationById(req, res, next) {
        try {
            const notification = await Notification.findById(req.params.id);
            if (!notification) {
                return next({ status: 404, message: 'Notification not found' });
            }
            res.json(notification);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createNotification(req, res, next) {
        try {
            const { user, type, message, isRead } = req.body;
            const notification = new Notification({ user, type, message, isRead });
            await notification.save();
            res.status(201).json(notification);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateNotification(req, res, next) {
        try {
            const { user, type, message, isRead } = req.body;
            const notification = await Notification.findByIdAndUpdate(
                req.params.id,
                { user, type, message, isRead },
                { new: true, runValidators: true }
            );
            if (!notification) {
                return next({ status: 404, message: 'Notification not found' });
            }
            res.json(notification);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteNotification(req, res, next) {
        try {
            const notification = await Notification.findByIdAndDelete(req.params.id);
            if (!notification) {
                return next({ status: 404, message: 'Notification not found' });
            }
            res.json(notification);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = notificationController;