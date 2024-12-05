const Review = require('../models/Review');

const reviewController = {
    // Get all reviews
    async getAllReviews(req, res, next) {
        try {
            const reviews = await Review.find();
            res.json(reviews);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Get a specific review by ID
    async getReviewById(req, res, next) {
        try {
            const review = await Review.findById(req.params.id);
            if (!review) {
                return next({ status: 404, message: 'Review not found' });
            }
            res.json(review);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Create a new review
    async createReview(req, res, next) {
        try {
            const { reviewType, reviewFor, user, rating, comment } = req.body;
            const review = new Review({ reviewType, reviewFor, user, rating, comment });
            await review.save();
            res.status(201).json(review);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    // Update an existing review by ID
    async updateReview(req, res, next) {
        try {
            const { reviewType, reviewFor, user, rating, comment } = req.body;
            const review = await Review.findByIdAndUpdate(
                req.params.id,
                { reviewType, reviewFor, user, rating, comment },
                { new: true, runValidators: true }
            );
            if (!review) {
                return next({ status: 404, message: 'Review not found' });
            }
            res.json(review);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    // Delete a review by ID
    async deleteReview(req, res, next) {
        try {
            const review = await Review.findByIdAndDelete(req.params.id);
            if (!review) {
                return next({ status: 404, message: 'Review not found' });
            }
            res.json(review);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
};

module.exports = reviewController;