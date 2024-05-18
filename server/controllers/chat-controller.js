const Chat = require('../models/Chat');

async function createChat(req, res) {
    try {
        const newChat = new Chat({
            // chatname: req.body.chatname,
            members: req.body.members,
            // isGroupChat: req.body.isGroupChat,
        });

        const savedChat = await newChat.save();
        res.status(201).json(savedChat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getChat(req, res) {
    try {
        const chat = await Chat.findById(req.params.id)
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllChats(req, res) {
    try {
        const chats = await Chat.find().populate('members');
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateChat(req, res) {
    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedChat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        res.status(200).json(updatedChat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getChatsForUser(req, res) {
    try {
        const userId = req.body.id; // Assuming you are sending userId in the body of a POST request
        const chats = await Chat.find({ members: userId }).populate('members', 'name'); // Populating member names
        if (!chats || chats.length === 0) {
            return res.status(404).json({ message: "No chats found for this user." });
        }
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
const ChatController = {
    createChat,
    getChat,
    getAllChats,
    updateChat,
    getChatsForUser
};

module.exports = ChatController;
