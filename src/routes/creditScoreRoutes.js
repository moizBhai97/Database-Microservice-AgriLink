const express = require('express');
const creditScoreController = require('../controllers/creditScoreController');

const router = express.Router();

router.route('/')
    .get(creditScoreController.getAllCreditScores)
    .post(creditScoreController.createCreditScore);

router.route('/:id')
    .get(creditScoreController.getCreditScoreById)
    .put(creditScoreController.updateCreditScore)
    .delete(creditScoreController.deleteCreditScore);

module.exports = router;