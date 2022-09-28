const express = require('express');

const {Router} = express;

const orderController = require('../controllers/orderController');


const SecurityMiddleware = require("../middlewares/securityMiddleware");
const orderRouter = Router();


// productsRouter.get('/', orderController.getProducts);
orderRouter.get('/:id?', SecurityMiddleware, orderController.getOrders);


orderRouter.post('/', SecurityMiddleware, orderController.createOrder);


module.exports = orderRouter;