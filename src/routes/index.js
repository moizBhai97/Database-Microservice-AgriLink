const express = require('express');
const blogRoutes = require('./blogRoutes');
const bookingRoutes = require('./bookingRoutes');
const chatRoutes = require('./chatRoutes');
const cropDiagnosisRoutes = require('./cropDiagnosisRoutes');
const cropHealthDataRoutes = require('./cropHealthDataRoutes');
const cropImageRoutes = require('./cropImageRoutes');
const logisticsRequestRoutes = require('./logisticsRequestRoutes');
const discussionForumRoutes = require('./discussionForumRoutes');
const documentRoutes = require('./documentRoutes');
const equipmentRoutes = require('./equipmentRoutes');
const farmerProfileRoutes = require('./farmerProfileRoutes');
const ratingRoutes = require('./ratingRoutes');
const feedbackRoutes = require('./feedbackRoutes');
const subsidyRoutes = require('./subsidyRoutes');
//A
const loanApplicationRoutes = require('./loanApplicationRoutes');
const userRoutes = require('./userRoutes');
const supplierProfileRoutes = require('./supplierProfileRoutes');
const productRoutes = require('./productRoutes');
const regulationRoutes = require('./regulationRoutes');
//
const router = express.Router();

router.use('/blogs', blogRoutes);
router.use('/bookings', bookingRoutes);
router.use('/chats', chatRoutes);
router.use('/cropDiagnoses', cropDiagnosisRoutes);
router.use('/cropHealthData', cropHealthDataRoutes);
router.use('/cropImages', cropImageRoutes);
router.use('/logisticsRequests', logisticsRequestRoutes);
router.use('/forums', discussionForumRoutes);
router.use('/documents', documentRoutes);
router.use('/equipment', equipmentRoutes);
router.use('/farmerProfiles', farmerProfileRoutes);
router.use('/ratings', ratingRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/subsidies', subsidyRoutes);
//A
router.use('/loanApplications', loanApplicationRoutes);
router.use('/users', userRoutes);
router.use('/supplierProfiles', supplierProfileRoutes);
router.use('/products', productRoutes);
router.use('/regulations', regulationRoutes);
//
module.exports = router;