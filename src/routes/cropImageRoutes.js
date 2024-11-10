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

module.exports = router;