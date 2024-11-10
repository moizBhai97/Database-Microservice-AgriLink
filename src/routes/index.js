const express = require('express');
const blogRoutes = require('./blogRoutes');
const bookingRoutes = require('./bookingRoutes');

const router = express.Router();

router.use('/blogs', blogRoutes);
router.use('/bookings', bookingRoutes);

module.exports = router;