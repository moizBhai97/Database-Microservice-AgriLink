const express = require('express');
const governmentOfficialController = require('../controllers/governmentOfficialController');

const router = express.Router();

router.route('/')
    .get(governmentOfficialController.getAllOfficials)
    .post(governmentOfficialController.createOfficial);

router.route('/:id')
    .get(governmentOfficialController.getOfficialById)
    .put(governmentOfficialController.updateOfficial)
    .delete(governmentOfficialController.deleteOfficial);

module.exports = router;