const { User, Role } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {

    // Signup functionality
    // async signup(req, res, next) {
    //     try {
    //         const { username, password, roles, personalDetails } = req.body;
    //         const existingUser = await User.findOne({ username });
    //         if (existingUser) {
    //             return res.status(400).json({ message: 'Username already exists' });
    //         }
    //         const hashedPassword = await bcrypt.hash(password, 10);
    //         const newUser = new User({
    //             username,
    //             password: hashedPassword,
    //             roles,
    //             personalDetails,
    //         });

    //         await newUser.save();
    //         res.status(201).json({ message: 'User created successfully', userId: newUser._id });
    //     } catch (error) {
    //         next({ status: 500, message: 'Internal Server Error', error });
    //     }
    // },

    // // Login functionality
    // async login(req, res, next) {
    //     try {
    //         const { username, password } = req.body;

    //         const user = await User.findOne({ username });
    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }
    //         const isMatch = await bcrypt.compare(password, user.password);
    //         if (!isMatch) {
    //             return res.status(401).json({ message: 'Invalid credentials' });
    //         }

    //         const token = jwt.sign(
    //             {
    //                 username: user.username,
    //                 roles: user.roles,
    //             },
    //             process.env.SECRET_KEY,
    //             { expiresIn: '24h' }
    //         );

    //         res.json({ message: 'Login successful', token });
    //     } catch (error) {
    //         next({ status: 500, message: 'Internal Server Error', error });
    //     }
    // },

    async getAllUsers(req, res, next) {
        try {
            const users = await User.find().populate('role');
            res.json(users);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getUserById(req, res, next) {
        try {
            const user = await User.findById(req.params.id).populate('role');
            if (!user) {
                return next({ status: 404, message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getUserByUsername(req, res, next) {
        try {
            const { username, password } = req.body;
            
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            res.json(user);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createUser(req, res, next) {
        try {
            const { username, password, role, status, personalDetails, preferences } = req.body;
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const userRole = await Role.findOne({ name: role });
            if (!userRole) {
                return res.status(400).json({ message: 'Invalid role' });
            }
            const newUser = new User({
                username,
                password: hashedPassword,
                role: userRole._id,
                status,
                personalDetails,
                preferences,
            });
            await newUser.save();
            res.status(201).json({ message: 'User created successfully', userId: newUser._id });
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
            if (updates.password) {
                updates.password = await bcrypt.hash(updates.password, 10);
            }
            if (updates.role) {
                const userRole = await Role.findById(updates.role);
                if (!userRole) {
                    return res.status(400).json({ message: 'Invalid role' });
                }
            }
            const user = await User.findByIdAndUpdate(
                req.params.id,
                updates,
                { new: true, runValidators: true }
            ).populate('role');
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

            user.personalDetails.firstName = firstName || user.personalDetails.firstName;
            user.personalDetails.lastName = lastName || user.personalDetails.lastName;
            user.personalDetails.contactInfo = contactInfo || user.personalDetails.contactInfo;
            user.personalDetails.address = address || user.personalDetails.address;
            user.personalDetails.businessDetails = businessDetails || user.personalDetails.businessDetails;

            await user.save();
            res.status(200).json({ message: 'Personal details updated successfully', user });
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
};

module.exports = userController;