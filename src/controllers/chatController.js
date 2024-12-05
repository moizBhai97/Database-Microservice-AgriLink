const Chat = require('../models/Chat');

const chatController = {
    async getAllChats(req, res, next) {
        try {
            const chats = await Chat.find();
            res.json(chats);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getChatById(req, res, next) {
        try {
            const chat = await Chat.findById(req.params.id);
            if (!chat) {
                return next({ status: 404, message: 'Chat not found' });
            }
            res.json(chat);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createChat(req, res, next) {
        try {
            const { participants, messages, status } = req.body;
            const chat = new Chat({ participants, messages, status });
            await chat.save();
            res.status(201).json(chat);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateChat(req, res, next) {
        try {
            const { participants, messages, status } = req.body;
            const chat = await Chat.findByIdAndUpdate(
                req.params.id,
                { participants, messages, status },
                { new: true, runValidators: true }
            );
            if (!chat) {
                return next({ status: 404, message: 'Chat not found' });
            }
            res.json(chat);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteChat(req, res, next) {
        try {
            const chat = await Chat.findByIdAndDelete(req.params.id);
            if (!chat) {
                return next({ status: 404, message: 'Chat not found' });
            }
            res.json(chat);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async addMessage(req, res, next) {
        try {
            const { sender, content } = req.body;
            const chat = await Chat.findById(req.params.id);
            if (!chat) {
                return next({ status: 404, message: 'Chat not found' });
            }
            chat.messages.push({ sender, content });
            await chat.save();
            res.status(201).json(chat);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateMessage(req, res, next) {
        try {
            const { messageId, content } = req.body;
            const chat = await Chat.findById(req.params.id);
            if (!chat) {
                return next({ status: 404, message: 'Chat not found' });
            }
            const message = chat.messages.id(messageId);
            if (!message) {
                return next({ status: 404, message: 'Message not found' });
            }
            message.content = content;
            await chat.save();
            res.json(chat);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteMessage(req, res, next) {
        try {
            const { messageId } = req.params;
            const chat = await Chat.findById(req.params.id);
            if (!chat) {
                return next({ status: 404, message: 'Chat not found' });
            }
            const message = chat.messages.id(messageId);
            if (!message) {
                return next({ status: 404, message: 'Message not found' });
            }
            message.remove();
            await chat.save();
            res.json(chat);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async markOtherUsersMessagesAsRead(req, res, next) {
        try {
            const { senderId } = req.body;
            const chatId = req.params.id;

            // Find chat
            const chat = await Chat.findById(chatId);
            if (!chat) {
                return next({ status: 404, message: 'Chat not found' });
            }

            // Update isRead status for other users' messages
            chat.messages.forEach(message => {
                if (message.sender.toString() !== senderId) {
                    message.isRead = true;
                }
            });

            // Save the updated chat
            await chat.save();

            res.json(chat);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = chatController;