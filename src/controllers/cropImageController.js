const CropImage = require('../models/CropImage');

const cropImageController = {
    async getAllImages(req, res, next) {
        try {
            const images = await CropImage.find().populate('uploadedBy labels.labeledBy labels.upvotes labels.downvotes');
            res.json(images);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getImageById(req, res, next) {
        try {
            const image = await CropImage.findById(req.params.id).populate('uploadedBy labels.labeledBy labels.upvotes labels.downvotes');
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
            const { imageUrl, uploadedBy, labels = [] } = req.body;
            const image = new CropImage({ imageUrl, uploadedBy, labels });
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
            const { status, finalLabel } = req.body;
            const image = await CropImage.findByIdAndUpdate(
                req.params.id,
                { status, finalLabel },
                { new: true, runValidators: true }
            ).populate('uploadedBy labels.labeledBy labels.upvotes labels.downvotes');
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

    async upvoteLabel(req, res, next) {
        try {
            const { labelId, userId } = req.body;
            const image = await CropImage.findById(req.params.id);
            if (!image) {
                return next({ status: 404, message: 'Image not found' });
            }
            const label = image.labels.id(labelId);
            if (!label) {
                return next({ status: 404, message: 'Label not found' });
            }
            if (!label.upvotes.includes(userId) && !label.downvotes.includes(userId)) {
                label.upvotes.push(userId);
            } else {
                return next({ status: 400, message: 'User has already voted' });
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
    },

    async downvoteLabel(req, res, next) {
        try {
            const { labelId, userId } = req.body;
            const image = await CropImage.findById(req.params.id);
            if (!image) {
                return next({ status: 404, message: 'Image not found' });
            }
            const label = image.labels.id(labelId);
            if (!label) {
                return next({ status: 404, message: 'Label not found' });
            }
            if (!label.downvotes.includes(userId) && !label.upvotes.includes(userId)) {
                label.downvotes.push(userId);
            } else {
                return next({ status: 400, message: 'User has already voted' });
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
    },

    async dropLabel(req, res, next) {
        try {
            const { labelId } = req.body;
            const image = await CropImage.findById(req.params.id);
            if (!image) {
                return next({ status: 404, message: 'Image not found' });
            }
            const label = image.labels.id(labelId);
            if (!label) {
                return next({ status: 404, message: 'Label not found' });
            }
            if (!label.isDropped) {
                label.isDropped = true;
            } else {
                return next({ status: 400, message: 'Label is already dropped' });
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