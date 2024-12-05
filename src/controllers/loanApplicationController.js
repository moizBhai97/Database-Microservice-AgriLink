const LoanApplication = require('../models/LoanApplication');

const loanApplicationController = {
    async getAllLoanApplications(req, res, next) {
        try {
            const loanApplications = await LoanApplication.find();
            res.json(loanApplications);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getLoanApplicationById(req, res, next) {
        try {
            const loanApplication = await LoanApplication.findById(req.params.id);
            if (!loanApplication) {
                return next({ status: 404, message: 'Loan Application not found' });
            }
            res.json(loanApplication);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createLoanApplication(req, res, next) {
        try {
            const { farmer, loanAmount, loanPurpose, interestRate, status } = req.body;
            const loanApplication = new LoanApplication({ farmer, loanAmount, loanPurpose, interestRate, status });
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

    async updateLoanApplication(req, res, next) {
        try {
            const { farmer, loanAmount, loanPurpose, interestRate, status } = req.body;
            const loanApplication = await LoanApplication.findByIdAndUpdate(
                req.params.id,
                { farmer, loanAmount, loanPurpose, interestRate, status },
                { new: true, runValidators: true }
            );
            if (!loanApplication) {
                return next({ status: 404, message: 'Loan Application not found' });
            }
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
                return next({ status: 404, message: 'Loan Application not found' });
            }
            res.json(loanApplication);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = loanApplicationController;