const express = require('express');
const creditScoreController = require('../controllers/creditScoreController');
const router = express.Router();

router.route('/:userId')
    .get(creditScoreController.getCreditScore);

module.exports = router;
