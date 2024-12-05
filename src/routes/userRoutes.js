const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/:username')
    .get(userController.getUserByUsername);

router.route('/:id/preferences')
    .put(userController.updatePreferences);

router.route('/:id/PersonalDetails')
    .put(userController.updatePersonalDetails);

module.exports = router;
