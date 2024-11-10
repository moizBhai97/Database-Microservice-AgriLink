const express = require('express');
const subsidyController = require('../controllers/subsidyController');

const router = express.Router();

router.route('/')
    .get(subsidyController.getAllSubsidies)
    .post(subsidyController.createSubsidy);

router.route('/:id')
    .get(subsidyController.getSubsidyById)
    .put(subsidyController.updateSubsidy)
    .delete(subsidyController.deleteSubsidy);

module.exports = router;
