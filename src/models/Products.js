const mongoose = require("mongoose");

const prodsCollection = 'products';

const ProductSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true, max: 200},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    photo: {type: String, required: true},
    stock:{type: Number, required: false}
})

const products = mongoose.model(prodsCollection, ProductSchema);

module.exports = products