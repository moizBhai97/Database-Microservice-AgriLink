const CreditScore = require('../models/CreditScore');
const { updateCreditScore } = require('../utils/creditScoreCalculator');

const creditScoreController = {
    async getCreditScore(req, res, next) {
        try {
            const creditScore = await CreditScore.findOne({ userId: req.params.userId });
            if (!creditScore) {
                return next({ status: 404, message: 'Credit score not found.' });
            }
            res.json(creditScore);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async updateCreditScoreOnRepayment(userId, repaymentStatus, loanAmount) {
        try {
            let creditScore = await CreditScore.findOne({ userId });

            if (!creditScore) {
                creditScore = new CreditScore({ userId });
            }

            creditScore = updateCreditScore(creditScore, repaymentStatus, loanAmount);
            await creditScore.save();
            return creditScore;
        } catch (error) {
            console.error('Error updating credit score:', error.message);
            throw error;
        }
    }
};

module.exports = creditScoreController;
