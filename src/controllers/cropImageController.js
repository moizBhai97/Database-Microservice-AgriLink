const CropImage = require('../models/CropImage');
const FarmerProfile = require('../models/FarmerProfile');
const farmerProfileController = require('./farmerProfileController');

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
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { imageUrl, cropName, uploadedBy, labels = [] } = req.body;
            const image = new CropImage({ imageUrl, cropName, uploadedBy, labels });
            await image.save({ session });

            const profile = await FarmerProfile.findById(uploadedBy).session(session);
            if (!profile) {
                throw new Error('Profile not found');
            }
            profile.contributionStats.numContributed += 1;
            await profile.save({ session });

            await session.commitTransaction();
            res.status(201).json(image);
        } catch (error) {
            await session.abortTransaction();
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        } finally {
            session.endSession();
        }
    },

    async updateImage(req, res, next) {
        try {
            const { status, finalLabel, cropName } = req.body;
            const updateFields = { status, finalLabel };
            if (cropName !== undefined) {
                updateFields.cropName = cropName;
            }
            const image = await CropImage.findByIdAndUpdate(
                req.params.id,
                updateFields,
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
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { label, labeledBy } = req.body;
            const image = await CropImage.findById(req.params.id).session(session);
            if (!image) {
                throw new Error('Image not found');
            }

            image.labels.push({ label, labeledBy });
            image.status = 'labeled';
            await image.save({ session });

            const profile = await FarmerProfile.findById(labeledBy).session(session);
            if (!profile) {
                throw new Error('Profile not found');
            }
            profile.contributionStats.numLabeled += 1;
            await profile.save({ session });

            await session.commitTransaction();
            res.status(201).json(image);
        } catch (error) {
            await session.abortTransaction();
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        } finally {
            session.endSession();
        }
    },


    async upvoteLabel(req, res, next) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { labelId, userId } = req.body;
            const image = await CropImage.findById(req.params.id).session(session);
            if (!image) {
                throw new Error('Image not found');
            }

            const label = image.labels.id(labelId);
            if (!label) {
                throw new Error('Label not found');
            }

            if (!label.upvotes.includes(userId) && !label.downvotes.includes(userId)) {
                label.upvotes.push(userId);
            } else {
                throw new Error('User has already voted');
            }
            await image.save({ session });

            const profile = await FarmerProfile.findById(label.labeledBy).session(session);
            if (!profile) {
                throw new Error('Profile not found');
            }
            profile.contributionStats.numValidated += 1;
            await profile.save({ session });

            await session.commitTransaction();
            res.json(image);
        } catch (error) {
            await session.abortTransaction();
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        } finally {
            session.endSession();
        }
    },

    async downvoteLabel(req, res, next) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { labelId, userId } = req.body;
            const image = await CropImage.findById(req.params.id).session(session);
            if (!image) {
                throw new Error('Image not found');
            }

            const label = image.labels.id(labelId);
            if (!label) {
                throw new Error('Label not found');
            }

            if (!label.downvotes.includes(userId) && !label.upvotes.includes(userId)) {
                label.downvotes.push(userId);
            } else {
                throw new Error('User has already voted');
            }
            await image.save({ session });

            const profile = await FarmerProfile.findById(label.labeledBy).session(session);
            if (!profile) {
                throw new Error('Profile not found');
            }
            profile.contributionStats.numValidated += 1;
            await profile.save({ session });

            await session.commitTransaction();
            res.json(image);
        } catch (error) {
            await session.abortTransaction();
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        } finally {
            session.endSession();
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