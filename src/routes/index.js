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
const creditScoreRoutes = require('./creditScoreRoutes');
const transactionRoutes = require('./transactionRoutes');
const loanRepaymentMonitoringRoutes = require('./loanRepaymentMonitoringRoutes');
const escrowRoutes = require('./escrowRoutes');
 
//A
const loanApplicationRoutes = require('./loanApplicationRoutes');
const userRoutes = require('./userRoutes');
const supplierProfileRoutes = require('./supplierProfileRoutes');
const productRoutes = require('./productRoutes');
const regulationRoutes = require('./regulationRoutes');
const priceListRoutes = require('./priceListRoutes');
const paymentRoutes = require('./paymentRoutes');
const subsidyApplicationRoutes = require('./subsidyApplicationRoutes');
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
router.use('/creditscores', creditScoreRoutes);
router.use('/transactions', transactionRoutes);
router.use('/loan-repayments', loanRepaymentMonitoringRoutes);
router.use('/es',escrowRoutes)

//A
router.use('/loan-applications', loanApplicationRoutes);
router.use('/users', userRoutes);
router.use('/supplierProfiles', supplierProfileRoutes);
router.use('/products', productRoutes);
router.use('/regulations', regulationRoutes);
router.use('/priceLists', priceListRoutes);
router.use('/payments', paymentRoutes);
router.use('/subsidyApplications', subsidyApplicationRoutes);
//
module.exports = router;