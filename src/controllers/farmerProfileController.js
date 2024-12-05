const FarmerProfile = require('../models/FarmerProfile');

const farmerProfileController = {
    async getAllProfiles(req, res, next) {
        try {
            const profiles = await FarmerProfile.find();
            res.json(profiles);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getProfileById(req, res, next) {
        try {
            const profile = await FarmerProfile.findById(req.params.id);
            if (!profile) {
                return next({ status: 404, message: 'Profile not found' });
            }
            res.json(profile);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createProfile(req, res, next) {
        try {
            const { user, farmDetails, bankDetails, thresholds } = req.body;
            const profile = new FarmerProfile({ user, farmDetails, bankDetails, thresholds });
            await profile.save();
            res.status(201).json(profile);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateProfile(req, res, next) {
        try {
            const { user, farmDetails, bankDetails, thresholds } = req.body;
            const profile = await FarmerProfile.findByIdAndUpdate(
                req.params.id,
                { user, farmDetails, bankDetails, thresholds },
                { new: true, runValidators: true }
            );
            if (!profile) {
                return next({ status: 404, message: 'Profile not found' });
            }
            res.json(profile);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateContributionStats(req, res, next) {
        try {
            const { numContributed, numLabeled, numValidated } = req.body;
            const profile = await FarmerProfile.findById(req.params.id);
            if (!profile) {
                return next({ status: 404, message: 'Profile not found' });
            }
            if (numContributed !== undefined) profile.contributionStats.numContributed = numContributed;
            if (numLabeled !== undefined) profile.contributionStats.numLabeled = numLabeled;
            if (numValidated !== undefined) profile.contributionStats.numValidated = numValidated;
            await profile.save();
            res.json(profile);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateThresholds(req, res, next) {
        try {
            const { thresholds } = req.body;
            const profile = await FarmerProfile.findById(req.params.id);
            if (!profile) {
                return next({ status: 404, message: 'Profile not found' });
            }
            profile.thresholds = thresholds;
            await profile.save();
            res.json(profile);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteProfile(req, res, next) {
        try {
            const profile = await FarmerProfile.findByIdAndDelete(req.params.id);
            if (!profile) {
                return next({ status: 404, message: 'Profile not found' });
            }
            res.json(profile);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = farmerProfileController;