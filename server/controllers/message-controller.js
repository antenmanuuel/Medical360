const Message = require('../models/Message');
const Chat = require('../models/Chat');

async function createMessage(req, res) {
    try {
        const newMessage = new Message({
            sender: req.body.sender,
            content: req.body.content,
            chat: req.body.chat,
            sentAt: new Date(),
        });

        const savedMessage = await newMessage.save();
        console.log('Message saved:', savedMessage);

        // Optionally update the chat document to include new message
        const updatedChat = await Chat.findByIdAndUpdate(
            req.body.chat,
            { $push: { messages: savedMessage._id } },
            { new: true }
        );
        console.log('Chat updated with new message:', updatedChat);

        res.status(201).json(savedMessage);
    } catch (error) {
        console.error('Failed to create message:', error);
        res.status(500).json({ message: "Error creating message: " + error.message });
    }
}

async function getMessagesForChat(req, res) {
    try {
        const messages = await Message.find({ chat: req.params.chatId }).sort({ sentAt: -1 }); // Sort by sentAt descending
        res.status(200).json(messages);
    } catch (error) {
        console.error('Failed to get messages for chat:', error);
        res.status(500).json({ message: "Error fetching messages: " + error.message });
    }
}

const MessageController = {
    createMessage,
    getMessagesForChat
};

module.exports = MessageController;

