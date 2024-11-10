const express = require('express');
const equipmentController = require('../controllers/equipmentController');

const router = express.Router();

router.route('/')
    .get(equipmentController.getAllEquipment)
    .post(equipmentController.createEquipment);

router.route('/:id')
    .get(equipmentController.getEquipmentById)
    .put(equipmentController.updateEquipment)
    .delete(equipmentController.deleteEquipment);

module.exports = router;