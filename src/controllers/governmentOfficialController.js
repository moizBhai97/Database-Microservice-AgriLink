const GovernmentOfficial = require('../models/GovernmentOfficial');

const governmentOfficialController = {
    async getAllOfficials(req, res, next) {
        try {
            const officials = await GovernmentOfficial.find().populate('user');
            res.json(officials);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getOfficialById(req, res, next) {
        try {
            const official = await GovernmentOfficial.findById(req.params.id).populate('user');
            if (!official) {
                return next({ status: 404, message: 'Government Official not found' });
            }
            res.json(official);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createOfficial(req, res, next) {
        try {
            const { user, department } = req.body;
            const official = new GovernmentOfficial({ user, department });
            await official.save();
            res.status(201).json(official);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateOfficial(req, res, next) {
        try {
            const { user, department } = req.body;
            const official = await GovernmentOfficial.findByIdAndUpdate(
                req.params.id,
                { user, department },
                { new: true, runValidators: true }
            ).populate('user');
            if (!official) {
                return next({ status: 404, message: 'Government Official not found' });
            }
            res.json(official);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteOfficial(req, res, next) {
        try {
            const official = await GovernmentOfficial.findByIdAndDelete(req.params.id);
            if (!official) {
                return next({ status: 404, message: 'Government Official not found' });
            }
            res.json(official);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = governmentOfficialController;