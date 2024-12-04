const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// Get all bookings or create a new booking
router.route('/')
    .get(bookingController.getAllBookings)  // Get all bookings with filters
    .post(bookingController.createBooking); // Create a new booking

// Get, update or delete a booking by ID
router.route('/:id')
    .get(bookingController.getBookingById)    // Get booking by ID
    .put(bookingController.updateBooking)     // Update booking by ID
    .delete(bookingController.deleteBooking); // Delete booking by ID

module.exports = router;
