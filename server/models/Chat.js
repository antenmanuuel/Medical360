const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new mongoose.Schema({
    chatname: { type: String, required: false },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    isGroupChat: { type: Boolean, default: false }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
