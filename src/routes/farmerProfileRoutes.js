const express = require('express');
const farmerProfileController = require('../controllers/farmerProfileController');

const router = express.Router();

router.route('/')
    .get(farmerProfileController.getAllProfiles)
    .post(farmerProfileController.createProfile);

router.route('/:id')
    .get(farmerProfileController.getProfileById)
    .put(farmerProfileController.updateProfile)
    .delete(farmerProfileController.deleteProfile);

router.route('/:id/contribution')
    .put(farmerProfileController.updateContributionStats);

router.route('/:id/thresholds')
    .put(farmerProfileController.updateThresholds);

module.exports = router;