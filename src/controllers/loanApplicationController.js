const LoanApplication = require('../models/LoanApplication');

const loanApplicationController = {
    async createLoanApplication(req, res, next) {
        try {
            const { applicant, amountRequested, purpose, interestRate, documents } = req.body;
            const loanApplication = new LoanApplication({
                applicant,
                amountRequested,
                purpose,
                interestRate,
                status: 'pending',
                documents,
            });
            await loanApplication.save();
            res.status(201).json(loanApplication);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async getAllLoanApplications(req, res, next) {
        try {
            const loanApplications = await LoanApplication.find().populate('applicant documents');
            res.json(loanApplications);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getLoanApplicationById(req, res, next) {
        try {
            const loanApplication = await LoanApplication.findById(req.params.id).populate('applicant documents');
            if (!loanApplication) {
                return next({ status: 404, message: 'Loan application not found' });
            }
            res.json(loanApplication);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async updateLoanApplicationStatus(req, res, next) {
        try {
            const { status } = req.body;
            const loanApplication = await LoanApplication.findById(req.params.id);
            if (!loanApplication) {
                return next({ status: 404, message: 'Loan application not found' });
            }
            loanApplication.status = status;
            await loanApplication.save();
            res.json(loanApplication);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteLoanApplication(req, res, next) {
        try {
            const loanApplication = await LoanApplication.findByIdAndDelete(req.params.id);
            if (!loanApplication) {
                return next({ status: 404, message: 'Loan application not found' });
            }
            res.json(loanApplication);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = loanApplicationController;
