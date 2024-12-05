const Booking = require('../models/Booking');
const Equipment = require('../models/Equipment');

const bookingController = {
    // Get all bookings with filters
    async getAllBookings(req, res, next) {
        try {
            const {
                equipmentId,
                renterId,
                ownerId,
                startDate,
                endDate,
                minTotalPrice,
                maxTotalPrice,
            } = req.query;

            let query = {};

            // Filter by Equipment ID
            if (equipmentId) {
                query.equipment = equipmentId;
            }

            // Filter by Renter ID
            if (renterId) {
                query.renter = renterId;
            }

            // Filter by Owner ID
            if (ownerId) {
                query.owner = ownerId;
            }

            // Filter by Rental Period
            if (startDate && endDate) {
                query['rentalPeriod.startDate'] = { $lt: new Date(endDate) };
                query['rentalPeriod.endDate'] = { $gt: new Date(startDate) };
            }

            // Filter by Total Price Range
            if (minTotalPrice || maxTotalPrice) {
                query.totalPrice = {};
                if (minTotalPrice) {
                    query.totalPrice.$gte = Number(minTotalPrice);
                }
                if (maxTotalPrice) {
                    query.totalPrice.$lte = Number(maxTotalPrice);
                }
            }

            // Fetch bookings based on the constructed query
            const bookings = await Booking.find(query)
                .populate('renter owner');

            res.json(bookings);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Get booking by ID
    async getBookingById(req, res, next) {
        try {
            const booking = await Booking.findById(req.params.id)
                .populate('renter owner');

            if (!booking) {
                return next({ status: 404, message: 'Booking not found' });
            }
            res.json(booking);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Create a new booking
    async createBooking(req, res, next) {
        try {
            const {
                equipment,
                renter,
                owner,
                rentalPeriod,
                totalPrice,
                pickupTime,
            } = req.body;

            // Check if the equipment is available during the requested period
            const conflictingBooking = await Booking.findOne({
                equipment,
                'rentalPeriod.startDate': { $lt: new Date(rentalPeriod.endDate) },
                'rentalPeriod.endDate': { $gt: new Date(rentalPeriod.startDate) },
            });

            if (conflictingBooking) {
                return next({
                    status: 400,
                    message: 'Equipment is not available during the selected period',
                });
            }

            const booking = new Booking({
                equipment,
                renter,
                owner,
                rentalPeriod,
                totalPrice,
                pickupTime,
            });

            await booking.save();
            res.status(201).json(booking);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    // Update a booking
    async updateBooking(req, res, next) {
        try {
            const {
                equipment,
                renter,
                owner,
                rentalPeriod,
                totalPrice,
                pickupTime,
            } = req.body;

            // Check if the equipment is available during the new requested period
            const conflictingBooking = await Booking.findOne({
                _id: { $ne: req.params.id }, // Exclude the current booking
                equipment,
                'rentalPeriod.startDate': { $lt: new Date(rentalPeriod.endDate) },
                'rentalPeriod.endDate': { $gt: new Date(rentalPeriod.startDate) },
            });

            if (conflictingBooking) {
                return next({
                    status: 400,
                    message: 'Equipment is not available during the selected period',
                });
            }

            const booking = await Booking.findByIdAndUpdate(
                req.params.id,
                {
                    equipment,
                    renter,
                    owner,
                    rentalPeriod,
                    totalPrice,
                    pickupTime,
                },
                { new: true, runValidators: true }
            );

            if (!booking) {
                return next({ status: 404, message: 'Booking not found' });
            }
            res.json(booking);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    // Delete a booking
    async deleteBooking(req, res, next) {
        try {
            const booking = await Booking.findByIdAndDelete(req.params.id);
            if (!booking) {
                return next({ status: 404, message: 'Booking not found' });
            }
            res.json({ message: 'Booking deleted successfully' });
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
};

module.exports = bookingController;
