const express = require('express');
const feedbackController = require('../controllers/feedbackController');

const router = express.Router();

router.route('/')
    .get(feedbackController.getAllFeedback)
    .post(feedbackController.createFeedback);

router.route('/:id')
    .get(feedbackController.getFeedbackById)
    .put(feedbackController.updateFeedback)
    .delete(feedbackController.deleteFeedback);

module.exports = router;
