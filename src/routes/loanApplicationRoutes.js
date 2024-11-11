const express = require('express');
const loanApplicationController = require('../controllers/loanApplicationController');

const router = express.Router();

router.route('/')
    .get(loanApplicationController.getAllLoanApplications)
    .post(loanApplicationController.createLoanApplication);

router.route('/:id')
    .get(loanApplicationController.getLoanApplicationById)
    .delete(loanApplicationController.deleteLoanApplication);

router.route('/:id/status')
    .put(loanApplicationController.updateLoanApplicationStatus);

module.exports = router;
