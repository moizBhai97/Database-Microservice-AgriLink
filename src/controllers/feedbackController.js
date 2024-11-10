const Feedback = require('../models/Feedback');

const feedbackController = {
    // Get all feedback
    async getAllFeedback(req, res, next) {
        try {
            const feedback = await Feedback.find().populate('user product');
            //const feedback = await Feedback.find();
            res.json(feedback);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Get a specific feedback by ID
    async getFeedbackById(req, res, next) {
        try {
            const feedback = await Feedback.findById(req.params.id).populate('user product');
             //const feedback = await Feedback.findById(req.params.id);
            if (!feedback) {
                return next({ status: 404, message: 'Feedback not found' });
            }
            res.json(feedback);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Create new feedback
    async createFeedback(req, res, next) {
        try {
            const { content, user, product } = req.body;
            const feedback = new Feedback({ content, user, product });
            await feedback.save();
            res.status(201).json(feedback);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    // Update feedback by ID
    async updateFeedback(req, res, next) {
        try {
            const { content, user, product } = req.body;
            const feedback = await Feedback.findByIdAndUpdate(
                req.params.id,
                { content, user, product },
                { new: true, runValidators: true }
            ).populate('user product');
            // const { content, user, product } = req.body;
            // const feedback = await Feedback.findByIdAndUpdate(
            //     req.params.id,
            //     { content, user, product },
            //     { new: true, runValidators: true }
            // );
            if (!feedback) {
                return next({ status: 404, message: 'Feedback not found' });
            }
            res.json(feedback);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    // Delete feedback by ID
    async deleteFeedback(req, res, next) {
        try {
            const feedback = await Feedback.findByIdAndDelete(req.params.id);
            if (!feedback) {
                return next({ status: 404, message: 'Feedback not found' });
            }
            res.json(feedback);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
};

module.exports = feedbackController;
