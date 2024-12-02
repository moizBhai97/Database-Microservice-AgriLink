const Regulation = require('../models/Regulation');
const Farmer = require('../models/FarmerProfile');

const regulationController = {
    // Get all regulations
    async getAllRegulations(req, res, next) {
        try {
            const regulations = await Regulation.find().populate('bookmarkedBy', 'user');
            res.json(regulations);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Get regulation by ID
    async getRegulationById(req, res, next) {
        try {
            const regulation = await Regulation.findById(req.params.id).populate('bookmarkedBy', 'user');
            if (!regulation) {
                return next({ status: 404, message: 'Regulation not found' });
            }
            res.json(regulation);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Create new regulation
    async createRegulation(req, res, next) {
        try {
            const { title, description, effectiveDate, category, type } = req.body;
            const regulation = new Regulation({
                title,
                description,
                effectiveDate,
                category,
                type,
            });

            await regulation.save();
            res.status(201).json(regulation);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    // Update regulation
    async updateRegulation(req, res, next) {
        try {
            const updates = req.body;
            const regulation = await Regulation.findByIdAndUpdate(
                req.params.id,
                updates,
                { new: true, runValidators: true }
            );
            if (!regulation) {
                return next({ status: 404, message: 'Regulation not found' });
            }
            res.json(regulation);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    // Delete regulation
    async deleteRegulation(req, res, next) {
        try {
            const regulation = await Regulation.findByIdAndDelete(req.params.id);
            if (!regulation) {
                return next({ status: 404, message: 'Regulation not found' });
            }
            res.json({ message: 'Regulation deleted successfully', regulation });
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Add bookmark
    async addBookmark(req, res, next) {
        try {
            const regulation = await Regulation.findById(req.params.id);
            if (!regulation) {
                return next({ status: 404, message: 'Regulation not found' });
            }
            //const { farmerName } = req.body; 
            // const farmer = await Farmer.findOne({ name: farmerName });
            // if (!farmer) {
            //     return next({ status: 404, message: 'Farmer not found' });
            // }
            // const farmerId = farmer._id;
            const { farmerId } = req.body; //assuming id is stored in the authorization token
            if (!regulation.bookmarkedBy.includes(farmerId)) {
                regulation.bookmarkedBy.push(farmerId);
                await regulation.save();
            }
            res.json(regulation);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Remove bookmark
    async removeBookmark(req, res, next) {
        try {
            const regulation = await Regulation.findById(req.params.id);
            if (!regulation) {
                return next({ status: 404, message: 'Regulation not found' });
            }
            //const { farmerName } = req.body; 
            // const farmer = await Farmer.findOne({ name: farmerName });
            // if (!farmer) {
            //     return next({ status: 404, message: 'Farmer not found' });
            // }
            // const farmerId = farmer._id;
            const { farmerId } = req.body;
            regulation.bookmarkedBy = regulation.bookmarkedBy.filter(id => id.toString() !== farmerId);
            await regulation.save();
            res.json(regulation);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
};

module.exports = regulationController;
