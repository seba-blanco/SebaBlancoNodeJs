const mongoose = require("mongoose");

const chatCollection = 'chats';

const chatSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    email: {type: String, required: true, max: 200},
    tipo: {type: String, required: true},
    datetime: {type: string, required: true},
    message: {type: String, required: true}
})

const chats = mongoose.model(chatCollection, chatSchema);

module.exports = chats