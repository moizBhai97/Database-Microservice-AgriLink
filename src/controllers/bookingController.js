const Booking = require('../models/Booking');

const bookingController = {
    async getAllBookings(req, res, next) {
        try {
            const bookings = await Booking.find();
            res.json(bookings);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getBookingById(req, res, next) {
        try {
            const booking = await Booking.findById(req.params.id);
            if (!booking) {
                return next({ status: 404, message: 'Booking not found' });
            }
            res.json(booking);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createBooking(req, res, next) {
        try {
            const { equipment, renter, owner, rentalPeriod, totalPrice } = req.body;
            const booking = new Booking({ equipment, renter, owner, rentalPeriod, totalPrice });
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

    async updateBooking(req, res, next) {
        try {
            const { equipment, renter, owner, rentalPeriod, totalPrice } = req.body;
            const booking = await Booking.findByIdAndUpdate(
                req.params.id,
                { equipment, renter, owner, rentalPeriod, totalPrice },
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

    async deleteBooking(req, res, next) {
        try {
            const booking = await Booking.findByIdAndDelete(req.params.id);
            if (!booking) {
                return next({ status: 404, message: 'Booking not found' });
            }
            res.json(booking);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = bookingController;