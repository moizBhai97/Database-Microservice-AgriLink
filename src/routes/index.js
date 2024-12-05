const express = require('express');

const blogRoutes = require('./blogRoutes');
const bookingRoutes = require('./bookingRoutes');
const chatRoutes = require('./chatRoutes');
const cropDiagnosisRoutes = require('./cropDiagnosisRoutes');
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
const reviewRoutes = require('./reviewRoutes');
const notificationRoutes = require('./notificationRoutes');
const loanApplicationRoutes = require('./loanApplicationRoutes');
const userRoutes = require('./userRoutes');
const supplierProfileRoutes = require('./supplierProfileRoutes');
const productRoutes = require('./productRoutes');
const regulationRoutes = require('./regulationRoutes');
const priceListRoutes = require('./priceListRoutes');
const paymentRoutes = require('./paymentRoutes');
const subsidyApplicationRoutes = require('./subsidyApplicationRoutes');
const usageRecordRoutes = require('./usageRecordRoutes');
const governmentOfficialRoutes = require('./governmentOfficialRoutes');
const hourlyWeatherRoutes = require('./hourlyWeatherRoutes');
const weatherForecastRoutes = require('./weatherForecastRoutes');
const weatherHistoryRoutes = require('./weatherHistoryRoutes');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the AgriLink DB API',
    });
});

router.use('/blogs', blogRoutes);
router.use('/bookings', bookingRoutes);
router.use('/chats', chatRoutes);
router.use('/cropDiagnoses', cropDiagnosisRoutes);
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
router.use('/es', escrowRoutes)
router.use('/reviews', reviewRoutes);
router.use('/notifications', notificationRoutes);
router.use('/loan-applications', loanApplicationRoutes);
router.use('/users', userRoutes);
router.use('/supplierProfiles', supplierProfileRoutes);
router.use('/products', productRoutes);
router.use('/regulations', regulationRoutes);
router.use('/priceLists', priceListRoutes);
router.use('/payments', paymentRoutes);
router.use('/subsidyApplications', subsidyApplicationRoutes);
router.use('/usageRecords', usageRecordRoutes);
router.use('/governmentOfficials', governmentOfficialRoutes);
router.use('/hourlyWeather', hourlyWeatherRoutes);
router.use('/weatherForecasts', weatherForecastRoutes);
router.use('/weatherHistories', weatherHistoryRoutes);

router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

module.exports = router;