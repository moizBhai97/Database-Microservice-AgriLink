const PriceList = require('../models/PriceList');

const priceListController = {
    // Get all price lists
    async getAllPriceLists(req, res, next) {
        try {
            const priceLists = await PriceList.find();
            res.json(priceLists);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Get price list by ID
    async getPriceListById(req, res, next) {
        try {
            const priceList = await PriceList.findById(req.params.id);
            if (!priceList) {
                return next({ status: 404, message: 'Price list not found' });
            }
            res.json(priceList);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createPriceList(req, res, next) {
        try {
            const { productName, type, date, city, province, minimumPrice, maximumPrice, description } = req.body; // Use correct field names
            const priceList = new PriceList({
                productName,
                type,
                date,
                city,
                province,
                priceDetails: {
                    minimumPrice,
                    maximumPrice,
                    description
                }
            });
            await priceList.save();
            res.status(201).json(priceList);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },


    // Update a price list
    async updatePriceList(req, res, next) {
        try {
            const updates = req.body;
            const priceList = await PriceList.findByIdAndUpdate(
                req.params.id,
                updates,
                { new: true, runValidators: true }
            );
            if (!priceList) {
                return next({ status: 404, message: 'Price list not found' });
            }
            res.json(priceList);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    // Delete a price list
    async deletePriceList(req, res, next) {
        try {
            const priceList = await PriceList.findByIdAndDelete(req.params.id);
            if (!priceList) {
                return next({ status: 404, message: 'Price list not found' });
            }
            res.json({ message: 'Price list deleted successfully', priceList });
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
};

module.exports = priceListController;
