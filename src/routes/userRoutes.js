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

router.route('/:id/preferences')
    .put(userController.updatePreferences);

module.exports = router;
