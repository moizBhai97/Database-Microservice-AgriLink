const express = require('express');
const cropImageController = require('../controllers/cropImageController');

const router = express.Router();

router.route('/')
    .get(cropImageController.getAllImages)
    .post(cropImageController.createImage);

router.route('/:id')
    .get(cropImageController.getImageById)
    .put(cropImageController.updateImage)
    .delete(cropImageController.deleteImage);

router.route('/:id/label')
    .post(cropImageController.addLabel);

router.route('/:id/validate')
    .post(cropImageController.validateLabel);

module.exports = router;