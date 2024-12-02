const Review = require('../models/Review');

const reviewController = {
    
    async getReviews(req, res, next) {
        try {
            const reviews = await Review.find().populate('equipment user');
            res.json(reviews);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
    
    async addReview(req, res, next) {
        try {
            const { equipmentId, userId, rating, comment } = req.body;
            const review = new Review({ equipment: equipmentId, user: userId, rating, comment });
            await review.save();
            res.status(201).json(review);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    
};

module.exports = reviewController;
