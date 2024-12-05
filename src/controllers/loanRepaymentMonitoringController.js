const LoanRepaymentMonitoring = require('../models/LoanRepaymentMonitoring');

const loanRepaymentMonitoringController = {
    async getAllLoanRepayments(req, res, next) {
        try {
            const loanRepayments = await LoanRepaymentMonitoring.find();
            res.json(loanRepayments);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getLoanRepaymentById(req, res, next) {
        try {
            const loanRepayment = await LoanRepaymentMonitoring.findById(req.params.id);
            if (!loanRepayment) {
                return next({ status: 404, message: 'Loan Repayment not found' });
            }
            res.json(loanRepayment);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createLoanRepayment(req, res, next) {
        try {
            const { loan, repaymentDate, amountPaid, remainingBalance, status } = req.body;
            const loanRepayment = new LoanRepaymentMonitoring({ loan, repaymentDate, amountPaid, remainingBalance, status });
            await loanRepayment.save();
            res.status(201).json(loanRepayment);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateLoanRepayment(req, res, next) {
        try {
            const { loan, repaymentDate, amountPaid, remainingBalance, status } = req.body;
            const loanRepayment = await LoanRepaymentMonitoring.findByIdAndUpdate(
                req.params.id,
                { loan, repaymentDate, amountPaid, remainingBalance, status },
                { new: true, runValidators: true }
            );
            if (!loanRepayment) {
                return next({ status: 404, message: 'Loan Repayment not found' });
            }
            res.json(loanRepayment);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteLoanRepayment(req, res, next) {
        try {
            const loanRepayment = await LoanRepaymentMonitoring.findByIdAndDelete(req.params.id);
            if (!loanRepayment) {
                return next({ status: 404, message: 'Loan Repayment not found' });
            }
            res.json(loanRepayment);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = loanRepaymentMonitoringController;