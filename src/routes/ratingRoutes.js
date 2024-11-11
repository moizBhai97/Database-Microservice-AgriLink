const express = require('express');
const ratingController = require('../controllers/ratingController');

const router = express.Router();

router.route('/')
    .get(ratingController.getAllRatings)
    .post(ratingController.createRating);

router.route('/:id')
    .get(ratingController.getRatingById)
    .put(ratingController.updateRating)
    .delete(ratingController.deleteRating);

module.exports = router;
