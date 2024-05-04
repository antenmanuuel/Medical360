const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chat-controller'); // Adjust path as necessary

// POST route to create new chat
router.post('/', ChatController.createChat);

// GET route to get all chats
router.get('/', ChatController.getAllChats);

// GET route to get single chat by id
router.get('/:id', ChatController.getChat);

// PUT route to update a chat by id
router.put('/:id', ChatController.updateChat);

module.exports = router;
