const express = require('express');

const {Router} = express;
const cartController = require('../controllers/cartController');
const SecurityMiddleware = require("../middlewares/securityMiddleware");

const cartRouter = Router();


cartRouter.get('/', cartController.viewCartForUser);

// s

cartRouter.get('/:id/productos', cartController.getCarts);
cartRouter.post('/productos/:id', cartController.AddProdToCart);

cartRouter.post('/:id/productos', cartController.AddProdToCart);

cartRouter.post('/', cartController.createCart);

cartRouter.put('/:id/productos', cartController.updateCart);

cartRouter.delete('/:id', cartController.deleteCart);

cartRouter.delete('/:id/productos/:id_prod', cartController.deleteProdInCart);




module.exports = cartRouter;


