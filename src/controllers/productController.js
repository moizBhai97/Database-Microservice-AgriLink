const ProductCatalog = require('../models/Product');

const productController = {

    async getAllProducts(req, res, next) {
        try {
            const products = await ProductCatalog.find().populate('supplier');
            res.json(products);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getProductById(req, res, next) {
        try {
            const product = await ProductCatalog.findById(req.params.id).populate('supplier');
            if (!product) {
                return next({ status: 404, message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },


    async createProduct(req, res, next) {
        try {
            const { productName, category, details, images, location, availabilityStatus, supplier } = req.body;
            const product = new ProductCatalog({
                productName,
                category,
                details: {
                    description: details.description,
                    unit: details.unit,
                    specifications: details.specifications,
                    price: details.price,
                    quantity: details.quantity,
                },
                images,
                location,
                availabilityStatus,
                supplier
            });

            await product.save();
            res.status(201).json(product);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },


    async updateProduct(req, res, next) {
        try {
            const updates = req.body;
            if (updates.details) {
                updates.details = {
                    ...updates.details,
                };
            }
            const product = await ProductCatalog.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
            if (!product) {
                return next({ status: 404, message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },


    async deleteProduct(req, res, next) {
        try {
            const product = await ProductCatalog.findByIdAndDelete(req.params.id);
            if (!product) {
                return next({ status: 404, message: 'Product not found' });
            }
            res.json("Product deleted successfully");
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = productController;
