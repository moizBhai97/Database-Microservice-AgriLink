const Rating = require('../models/Rating');

const ratingController = {
    // Get all ratings
    async getAllRatings(req, res, next) {
        try {
            const ratings = await Rating.find().populate('user ratedUser');
            res.json(ratings);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Get a specific rating by ID
    async getRatingById(req, res, next) {
        try {
            const rating = await Rating.findById(req.params.id).populate('user ratedUser');
            if (!rating) {
                return next({ status: 404, message: 'Rating not found' });
            }
            res.json(rating);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Create a new rating
    async createRating(req, res, next) {
        try {
            const { value, user, ratedUser } = req.body;
            const rating = new Rating({ value, user, ratedUser });
            await rating.save();
            res.status(201).json(rating);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    // Update an existing rating by ID
    async updateRating(req, res, next) {
        try {
            const { value, user, ratedUser } = req.body;
            const rating = await Rating.findByIdAndUpdate(
                req.params.id,
                { value, user, ratedUser },
                { new: true, runValidators: true }
            ).populate('user ratedUser');
            if (!rating) {
                return next({ status: 404, message: 'Rating not found' });
            }
            res.json(rating);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    // Delete a rating by ID
    async deleteRating(req, res, next) {
        try {
            const rating = await Rating.findByIdAndDelete(req.params.id);
            if (!rating) {
                return next({ status: 404, message: 'Rating not found' });
            }
            res.json(rating);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
};

module.exports = ratingController;
