const express = require('express');
const creditScoreController = require('../controllers/creditScoreController');
const router = express.Router();

router.route('/:userId')
    .get(creditScoreController.getCreditScore)
    .put(creditScoreController.updateCreditScoreOnRepayment);

module.exports = router;
