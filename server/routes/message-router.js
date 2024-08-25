const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/message-controller'); 

// POST route to create new message
router.post('/', MessageController.createMessage);

// Post route to get all messages for a specific chat
router.post('/chat/:chatId', MessageController.getMessagesForChat);

module.exports = router;
