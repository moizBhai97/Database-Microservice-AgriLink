const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

router.route('/')
    .get(chatController.getAllChats)
    .post(chatController.createChat);

router.route('/:id')
    .get(chatController.getChatById)
    .put(chatController.updateChat)
    .delete(chatController.deleteChat);

router.route('/:id/messages')
    .post(chatController.addMessage);

router.route('/:id/messages/:messageId')
    .put(chatController.updateMessage)
    .delete(chatController.deleteMessage);

module.exports = router;