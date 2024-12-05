const express = require('express');
const loanApplicationController = require('../controllers/loanApplicationController');

const router = express.Router();

router.route('/')
    .get(loanApplicationController.getAllLoanApplications)
    .post(loanApplicationController.createLoanApplication);

router.route('/:id')
    .get(loanApplicationController.getLoanApplicationById)
    .put(loanApplicationController.updateLoanApplication)
    .delete(loanApplicationController.deleteLoanApplication);

module.exports = router;