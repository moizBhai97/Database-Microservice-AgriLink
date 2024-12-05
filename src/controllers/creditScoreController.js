const CreditScore = require('../models/CreditScore');

const creditScoreController = {
    async getAllCreditScores(req, res, next) {
        try {
            const creditScores = await CreditScore.find();
            res.json(creditScores);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getCreditScoreById(req, res, next) {
        try {
            const creditScore = await CreditScore.findById(req.params.id);
            if (!creditScore) {
                return next({ status: 404, message: 'Credit Score not found' });
            }
            res.json(creditScore);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createCreditScore(req, res, next) {
        try {
            const { user, score, history } = req.body;
            const creditScore = new CreditScore({ user, score, history });
            await creditScore.save();
            res.status(201).json(creditScore);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateCreditScore(req, res, next) {
        try {
            const { user, score, history } = req.body;
            const creditScore = await CreditScore.findByIdAndUpdate(
                req.params.id,
                { user, score, history },
                { new: true, runValidators: true }
            );
            if (!creditScore) {
                return next({ status: 404, message: 'Credit Score not found' });
            }
            res.json(creditScore);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteCreditScore(req, res, next) {
        try {
            const creditScore = await CreditScore.findByIdAndDelete(req.params.id);
            if (!creditScore) {
                return next({ status: 404, message: 'Credit Score not found' });
            }
            res.json(creditScore);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = creditScoreController;