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

module.exports = router;