const CropImage = require('../models/CropImage');

const cropImageController = {
    async getAllImages(req, res, next) {
        try {
            const images = await CropImage.find().populate('uploadedBy labels.labeledBy validatedBy');
            res.json(images);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getImageById(req, res, next) {
        try {
            const image = await CropImage.findById(req.params.id).populate('uploadedBy labels.labeledBy validatedBy');
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
            const { imageUrl, uploadedBy, status, labels, validatedBy, validationCount, finalLabel } = req.body;
            const image = new CropImage({ imageUrl, uploadedBy, status, labels, validatedBy, validationCount, finalLabel });
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
            const { imageUrl, uploadedBy, status, labels, validatedBy, validationCount, finalLabel } = req.body;
            const image = await CropImage.findByIdAndUpdate(
                req.params.id,
                { imageUrl, uploadedBy, status, labels, validatedBy, validationCount, finalLabel },
                { new: true, runValidators: true }
            ).populate('uploadedBy labels.labeledBy validatedBy');
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
    },

    async addLabel(req, res, next) {
        try {
            const { label, labeledBy } = req.body;
            const image = await CropImage.findById(req.params.id);
            if (!image) {
                return next({ status: 404, message: 'Image not found' });
            }
            image.labels.push({ label, labeledBy });
            image.status = 'labeled';
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

    async validateLabel(req, res, next) {
        try {
            const { validatedBy } = req.body;
            const image = await CropImage.findById(req.params.id);
            if (!image) {
                return next({ status: 404, message: 'Image not found' });
            }
            image.validatedBy.push(validatedBy);
            image.validationCount += 1;
            if (image.validationCount >= 3) { // Assuming 3 validations are needed to finalize
                image.status = 'validated';
            }
            await image.save();
            res.json(image);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    }
};

module.exports = cropImageController;