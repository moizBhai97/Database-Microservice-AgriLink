const Equipment = require('../models/Equipment');

const equipmentController = {
    async getAllEquipment(req, res, next) {
        try {
            const equipment = await Equipment.find();
            res.json(equipment);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getEquipmentById(req, res, next) {
        try {
            const equipment = await Equipment.findById(req.params.id);
            if (!equipment) {
                return next({ status: 404, message: 'Equipment not found' });
            }
            res.json(equipment);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createEquipment(req, res, next) {
        try {
            const { owner, equipmentType, description, rentalPricePerDay, availabilityStatus, location, specifications, images } = req.body;
            const equipment = new Equipment({ owner, equipmentType, description, rentalPricePerDay, availabilityStatus, location, specifications, images });
            await equipment.save();
            res.status(201).json(equipment);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateEquipment(req, res, next) {
        try {
            const { owner, equipmentType, description, rentalPricePerDay, availabilityStatus, location, specifications, images } = req.body;
            const equipment = await Equipment.findByIdAndUpdate(
                req.params.id,
                { owner, equipmentType, description, rentalPricePerDay, availabilityStatus, location, specifications, images },
                { new: true, runValidators: true }
            );
            if (!equipment) {
                return next({ status: 404, message: 'Equipment not found' });
            }
            res.json(equipment);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteEquipment(req, res, next) {
        try {
            const equipment = await Equipment.findByIdAndDelete(req.params.id);
            if (!equipment) {
                return next({ status: 404, message: 'Equipment not found' });
            }
            res.json(equipment);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = equipmentController;