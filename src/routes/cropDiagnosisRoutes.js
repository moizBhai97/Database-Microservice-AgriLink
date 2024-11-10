const express = require('express');
const cropDiagnosisController = require('../controllers/cropDiagnosisController');

const router = express.Router();

router.route('/')
    .get(cropDiagnosisController.getAllDiagnoses)
    .post(cropDiagnosisController.createDiagnosis);

router.route('/:id')
    .get(cropDiagnosisController.getDiagnosisById)
    .put(cropDiagnosisController.updateDiagnosis)
    .delete(cropDiagnosisController.deleteDiagnosis);

router.route('/:id/suggestedActions')
    .post(cropDiagnosisController.addSuggestedAction);

router.route('/:id/suggestedActions/:actionId')
    .put(cropDiagnosisController.updateSuggestedAction)
    .delete(cropDiagnosisController.deleteSuggestedAction);

module.exports = router;