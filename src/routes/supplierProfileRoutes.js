const express = require('express');
const supplierProfileController = require('../controllers/supplierProfileController');

const router = express.Router();

router.route('/')
    .get(supplierProfileController.getAllSupplierProfiles)
    .post(supplierProfileController.createSupplierProfile);

router.route('/:id')
    .get(supplierProfileController.getSupplierProfileById)
    .put(supplierProfileController.updateSupplierProfile)
    .delete(supplierProfileController.deleteSupplierProfile);

module.exports = router;
