const express = require('express');
const priceListController = require('../controllers/priceListController');

const router = express.Router();

router.route('/')
    .get(priceListController.getAllPriceLists)
    .post(priceListController.createPriceList);

router.route('/:id')
    .get(priceListController.getPriceListById)
    .put(priceListController.updatePriceList)
    .delete(priceListController.deletePriceList);

module.exports = router;
