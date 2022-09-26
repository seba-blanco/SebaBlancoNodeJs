const cartService  = require ("../services/cartService")

const getCarts = async (req,res) => {
    try {
        let id = req.params.id;
        
        let prods = await cartService.getCarts(id);
        prods
            ? res.status(200).json(prods)
            : res.status(404).json({"error": "cart/s not found/s"})
        
    }
    catch (err) {
        res.status(400).json({
            msj:"failed to get products",
            error: err.message
        })
    }

}

const createCart = async (req, res) => {
    try {
        const newProd  = await cartService.createCart(req.body);
        newProd
            ? res.status(200).json(newProd)
            : res.status(400).json({"error": "something went wrong with this request"})
    }
    catch (err) {
        res.status(400).json({
            msj:"failed to save cart ",
            error: err.message
        }) 
    }
}

const updateCart = async (req, res) => {
    try {
        const id = req.params.id;
        let newProd = await cartService.updateCart(req.body, id);
        newProd
            ? res.status(200).json(newProd)
            : res.status(204).json({"error": "cart to update was not found"})
    }
    catch (err) {
        res.status(400).json({
            msj:"failed to update cart",
            error: err.message
        }) 
    }
}

const deleteCart = async (req, res) => {
    try {
        let id = req.params.id;
        const deletedProd  = await cartService.deleteCart(id);
        
        deletedProd
            ? res.status(200).json(deletedProd)
            : res.status(204).json({"error": "product to delete was not found"})
    }
    catch (err) {
        res.status(400).json({
            msj:"failed to delete cart",
            error: err.message
        }) 
    }
}

const deleteProdInCart = async(req, res) => {
    try {
        const id = req.params.id;
        const id_prod = req.params.id_prod;

        const deletedId = await cartService.deleteProdInCart(id, id_prod);
        deletedId
            ? res.status(200).json(deletedId)
            : res.status(204).json({"error": "product in cart to delete was not found"})
        
    }
    catch (err) {
        res.status(400).json({
            msj:"failed to delete prod in cart ",
            error: err.message
        }) 
    }
}

const getCartForUser = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await cartService.getCartForUser(id);
        cart
            ? res.status(200).json(cart)
            : res.status(204).json({"error": "cart for user not found"})

    }
    catch(err) {
        res.status(400).json({
            msj:"failed to get cart for user ",
            error: err.message
        })  
    }
    

    
}
   
module.exports = {getCarts
            ,createCart
            ,updateCart
            ,deleteCart
            ,getCartForUser
            ,deleteProdInCart
            }