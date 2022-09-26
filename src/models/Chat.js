const mongoose = require("mongoose");

const chatCollection = 'chats';

const chatSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    email: {type: String, required: true, max: 200},
    tipo: {type: String, required: true},
    timestamp: {type: Number, required: true, default: Date.now()},
    msj: {type: String, required: true}
})

const chats = mongoose.model(chatCollection, chatSchema);

module.exports = chats