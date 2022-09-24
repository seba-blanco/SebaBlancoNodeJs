const express = require('express');

const {Router} = express;

const prodController = require('../controllers/productController')


const SecurityMiddleware = require("../middlewares/securityMiddleware");
const productsRouter = Router();

productsRouter.get('/:id?', prodController.getProducts);


productsRouter.post('/', prodController.saveProd);

productsRouter.put('/id', prodController.updateProd);

productsRouter.delete('/id', prodController.deleteProd);

module.exports = productsRouter;