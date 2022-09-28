const mongoose = require("mongoose");

const orderCollection = 'orders';

const orderSchema = new mongoose.Schema({
    id: { type: Number, required: true},
    user:{type: String, required: true, max: 200},
    userEmail:{type: String, required: true, max: 200},
    timestamp: {type: Number, required: true, default: Date.now()},
    status:{type: String, required: true, max: 50, default:'generada'},
    prods: []
})

const orders = mongoose.model(orderCollection, orderSchema);

module.exports = orders