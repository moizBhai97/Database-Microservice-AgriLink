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

    async updateCreditScoreOnRepayment(req, res, next) {
        const { userId } = req.params;
        const { repaymentStatus, loanAmount } = req.body;

        try {
            let creditScore = await CreditScore.findOne({ userId });

            if (!creditScore) {
                creditScore = new CreditScore({ userId });
            }

            creditScore = updateCreditScore(creditScore, repaymentStatus, loanAmount);
            await creditScore.save();
            res.json(creditScore);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = creditScoreController;