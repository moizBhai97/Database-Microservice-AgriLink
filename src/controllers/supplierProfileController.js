const SupplierProfile = require('../models/SupplierProfile');

const supplierProfileController = {
    async createSupplierProfile(req, res, next) {
        try {
            const { user, logistics } = req.body;
            const supplierProfile = new SupplierProfile({
                user,
                logistics
            });
            await supplierProfile.save();
            res.status(201).json(supplierProfile);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async getAllSupplierProfiles(req, res, next) {
        try {
            const supplierProfiles = await SupplierProfile.find().populate('user');
            res.json(supplierProfiles);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getSupplierProfileById(req, res, next) {
        try {
            const supplierProfile = await SupplierProfile.findById(req.params.id).populate('user');
            if (!supplierProfile) {
                return next({ status: 404, message: 'Supplier Profile not found' });
            }
            res.json(supplierProfile);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async updateSupplierProfile(req, res, next) {
        try {
            const updates = req.body;
            const supplierProfile = await SupplierProfile.findByIdAndUpdate(
                req.params.id,
                updates,
                { new: true, runValidators: true }
            );
            if (!supplierProfile) {
                return next({ status: 404, message: 'Supplier Profile not found' });
            }
            res.json(supplierProfile);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteSupplierProfile(req, res, next) {
        try {
            const supplierProfile = await SupplierProfile.findByIdAndDelete(req.params.id);
            if (!supplierProfile) {
                return next({ status: 404, message: 'Supplier Profile not found' });
            }
            res.json("Supplier Profile deleted successfully");
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = supplierProfileController;
