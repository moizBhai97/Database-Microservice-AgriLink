const express = require('express');
const subsidyApplicationController = require('../controllers/subsidyApplicationController');

const router = express.Router();

// Get all applications and create a new application
router.route('/')
    .get(subsidyApplicationController.getAllApplications)
    .post(subsidyApplicationController.createApplication);

// Get, update, or delete a specific application by ID
router.route('/:id')
    .get(subsidyApplicationController.getApplicationById)
    .put(subsidyApplicationController.updateApplication)
    .delete(subsidyApplicationController.deleteApplication);

module.exports = router;
