const Subsidy = require('../models/Subsidy');

const subsidyController = {
    // Get all subsidies
    async getAllSubsidies(req, res, next) {
        try {
            const subsidies = await Subsidy.find().populate('createdBy');
            res.json(subsidies);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Get a specific subsidy by ID
    async getSubsidyById(req, res, next) {
        try {
            const subsidy = await Subsidy.findById(req.params.id).populate('createdBy');
            if (!subsidy) {
                return next({ status: 404, message: 'Subsidy not found' });
            }
            res.json(subsidy);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Create a new subsidy
    async createSubsidy(req, res, next) {
        try {
            const { title, category, region, description, applicationDeadline, amount, createdBy } = req.body;
            const subsidy = new Subsidy({ title, category, region, description, applicationDeadline, amount, createdBy });
            await subsidy.save();
            res.status(201).json(subsidy);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    // Update an existing subsidy by ID
    async updateSubsidy(req, res, next) {
        try {
            const { title, category, region, description, applicationDeadline, amount, createdBy } = req.body;
            const subsidy = await Subsidy.findByIdAndUpdate(
                req.params.id,
                { title, category, region, description, applicationDeadline, amount, createdBy },
                { new: true, runValidators: true }
            ).populate('createdBy');
            if (!subsidy) {
                return next({ status: 404, message: 'Subsidy not found' });
            }
            res.json(subsidy);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    // Delete a subsidy by ID
    async deleteSubsidy(req, res, next) {
        try {
            const subsidy = await Subsidy.findByIdAndDelete(req.params.id);
            if (!subsidy) {
                return next({ status: 404, message: 'Subsidy not found' });
            }
            res.json(subsidy);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
};

module.exports = subsidyController;
