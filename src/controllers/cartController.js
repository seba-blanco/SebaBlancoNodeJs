// consume el cart service que habla con el repository.

const cartService  = require ("../services/cartService")

//trae todos los carritos o uno por ID.
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

//crea un carrito
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

//actualiza el carrito
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


//eliminta el carrito
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


//elimina producto del carrito
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

//agrega producto al carrito
const AddProdToCart = async (req, res) => {
    try {
        let userId = req.user.id;
        const prodAdded = await cartService.AddProdToCart(userId, req.body.id);
        prodAdded
            ? res.status(200).json(prodAdded)
            : res.status(204).json({"error": "something went wrong"})
    }
    catch (err) {
        res.status(400).json({
            msj:"failed to add prod to cart ",
            error: err.message
        }) 
    }
}

//devuelve el carrito de un usuario
const getCartForUser = async (req, res) => {
    try {

        const id = req.user.id;
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

//esta funcion esta hecha para que devuelva la pagina del carrito.
const viewCartForUser = async (req, res) => {
    try {

        const id = req.user.id;
        const cart = await cartService.getCartForUser(id);
        
        res.render('pages/cart', {UserLogged: req.user.firstName, Carrito:cart});  

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
            ,AddProdToCart
            ,viewCartForUser
            }