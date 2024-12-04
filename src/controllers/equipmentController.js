const Equipment = require('../models/Equipment');
const Booking = require('../models/Booking'); // Import the Booking model for availability checks

const equipmentController = {
    async getAllEquipment(req, res, next) {
        try {
            // Extract search and filter parameters from the query string
            const {
                equipmentType,
                location,
                minPrice,
                maxPrice,
                startDate,
                endDate,
            } = req.query;

            let query = {};

            // Filter by equipment type
            if (equipmentType) {
                query.equipmentType = equipmentType;
            }

            // Filter by location
            if (location) {
                query.location = location;
            }

            // Filter by price range
            if (minPrice || maxPrice) {
                query.rentalPricePerDay = {};
                if (minPrice) {
                    query.rentalPricePerDay.$gte = Number(minPrice);
                }
                if (maxPrice) {
                    query.rentalPricePerDay.$lte = Number(maxPrice);
                }
            }

            // Check availability during the specified rental period
            if (startDate && endDate) {
                const bookedEquipmentIds = await Booking.find({
                    'rentalPeriod.startDate': { $lt: new Date(endDate) },
                    'rentalPeriod.endDate': { $gt: new Date(startDate) },
                }).distinct('equipment');

                // Exclude equipment that is already booked during the requested period
                query._id = { $nin: bookedEquipmentIds };
            }

            // Fetch equipment based on the constructed query
            const equipment = await Equipment.find(query);
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
            const {
                owner,
                equipmentType,
                description,
                rentalPricePerDay,
                availabilityStatus,
                location,
                specifications,
                images,
            } = req.body;

            const equipment = new Equipment({
                owner,
                equipmentType,
                description,
                rentalPricePerDay,
                availabilityStatus,
                location,
                specifications,
                images,
            });

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
            const {
                owner,
                equipmentType,
                description,
                rentalPricePerDay,
                availabilityStatus,
                location,
                specifications,
                images,
            } = req.body;

            const equipment = await Equipment.findByIdAndUpdate(
                req.params.id,
                {
                    owner,
                    equipmentType,
                    description,
                    rentalPricePerDay,
                    availabilityStatus,
                    location,
                    specifications,
                    images,
                },
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
            res.json({ message: 'Equipment deleted successfully' });
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
};

module.exports = equipmentController;
