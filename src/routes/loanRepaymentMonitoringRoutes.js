const express = require('express');
const loanRepaymentMonitoringController = require('../controllers/loanRepaymentMonitoringController');

const router = express.Router();

router.route('/')
    .get(loanRepaymentMonitoringController.getAllLoanRepayments)
    .post(loanRepaymentMonitoringController.createLoanRepayment);

router.route('/:id')
    .get(loanRepaymentMonitoringController.getLoanRepaymentById)
    .put(loanRepaymentMonitoringController.updateLoanRepayment)
    .delete(loanRepaymentMonitoringController.deleteLoanRepayment);

module.exports = router;