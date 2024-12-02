const express = require('express');
const usageRecordController = require('../controllers/usageRecordController');

const router = express.Router();

router.route('/')
    .get(usageRecordController.getAllUsageRecords)
    .post(usageRecordController.createUsageRecord);

router.route('/:id')
    .get(usageRecordController.getUsageRecordById)
    .put(usageRecordController.updateUsageRecord)
    .delete(usageRecordController.deleteUsageRecord);

module.exports = router;