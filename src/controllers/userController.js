const User = require('../models/User');  

const userController = {
    async getAllUsers(req, res, next) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

  
    async getUserById(req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return next({ status: 404, message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

 
    async createUser(req, res, next) {
        try {
            const { userId, username, password, roles, status, personalDetails, preferences } = req.body;
            const user = new User({
                userId,
                username,
                password,
                roles,
                status,
                personalDetails,
                preferences,
            });
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateUser(req, res, next) {
        try {
            const updates = req.body;  
            const user = await User.findByIdAndUpdate(
                req.params.id,
                updates,
                { new: true, runValidators: true }
            );
            if (!user) {
                return next({ status: 404, message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    // Delete user
    async deleteUser(req, res, next) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return next({ status: 404, message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Update user preferences
    async updatePreferences(req, res, next) {
        try {
            const { notifications } = req.body;
            const user = await User.findById(req.params.id);
            if (!user) {
                return next({ status: 404, message: 'User not found' });
            }
            user.preferences.notifications = notifications;
            await user.save();
            res.json(user);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
    async updatePersonalDetails(req, res, next) {
        const { id } = req.params;
        const { firstName, lastName, contactInfo, address, businessDetails } = req.body;

        try {
            const user = await User.findById(id);
            if (!user) {
                return next({ status: 404, message: 'User not found' });
            }
            console.log('body:', req.body);
            console.log('User:', user);
            
            user.personalDetails.firstName = req.body.firstName || user.personalDetails.firstName;
            user.personalDetails.lastName = lastName || user.personalDetails.lastName;
            user.personalDetails.contactInfo = contactInfo || user.personalDetails.contactInfo;
            user.personalDetails.address = address || user.personalDetails.address;
            user.personalDetails.businessDetails = businessDetails || user.personalDetails.businessDetails;

            await user.save();
            res.status(200).json({ message: 'Personal details updated successfully', user });
        } catch (error) {
            console.error(error);
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
};

module.exports = userController;
