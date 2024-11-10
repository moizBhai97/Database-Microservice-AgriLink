const CropImage = require('../models/CropImage');

const cropImageController = {
    async getAllImages(req, res, next) {
        try {
            const images = await CropImage.find();
            res.json(images);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getImageById(req, res, next) {
        try {
            const image = await CropImage.findById(req.params.id);
            if (!image) {
                return next({ status: 404, message: 'Image not found' });
            }
            res.json(image);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createImage(req, res, next) {
        try {
            const { imageUrl, uploadedBy, status, healthLabel } = req.body;
            const image = new CropImage({ imageUrl, uploadedBy, status, healthLabel });
            await image.save();
            res.status(201).json(image);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateImage(req, res, next) {
        try {
            const { imageUrl, uploadedBy, status, healthLabel } = req.body;
            const image = await CropImage.findByIdAndUpdate(
                req.params.id,
                { imageUrl, uploadedBy, status, healthLabel },
                { new: true, runValidators: true }
            );
            if (!image) {
                return next({ status: 404, message: 'Image not found' });
            }
            res.json(image);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteImage(req, res, next) {
        try {
            const image = await CropImage.findByIdAndDelete(req.params.id);
            if (!image) {
                return next({ status: 404, message: 'Image not found' });
            }
            res.json(image);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = cropImageController;