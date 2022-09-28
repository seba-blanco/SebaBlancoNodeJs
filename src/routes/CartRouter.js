const express = require('express');

const {Router} = express;


const cartController = require('../controllers/cartController');
const SecurityMiddleware = require("../middlewares/securityMiddleware");

const cartRouter = Router();


cartRouter.get('/', cartController.getCartForUser);

cartRouter.get('/verCarrito', cartController.viewCartForUser);

cartRouter.get('/:id/productos', cartController.getCarts);
cartRouter.post('/productos/:id', cartController.AddProdToCart);



cartRouter.post('/', cartController.createCart);

cartRouter.put('/:id/productos', cartController.updateCart);

cartRouter.delete('/:id', cartController.deleteCart);

cartRouter.delete('/:id/productos/:id_prod', cartController.deleteProdInCart);




module.exports = cartRouter;



// cartRouter.post("/:id/productos", async (req, res) => {
    
//     let updatedCarrito = await cartsDAO.update(req.params.id, req.body);
    
//     if (updatedCarrito)
//         res.json({updatedCarrito: updatedCarrito});
//     else {
//         res.json({errorMsg: "Cart not found"});
//     }
// })

// module.exports = cartRouter;