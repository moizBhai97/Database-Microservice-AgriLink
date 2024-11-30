const express = require('express');
const regulationController = require('../controllers/regulationController');

const router = express.Router();

router.route('/')
    .get(regulationController.getAllRegulations)
    .post(regulationController.createRegulation);

router.route('/:id')
    .get(regulationController.getRegulationById)
    .put(regulationController.updateRegulation)
    .delete(regulationController.deleteRegulation);

router.route('/:id/bookmarks')
    .post(regulationController.addBookmark)
    .delete(regulationController.removeBookmark);

module.exports = router;
