const orderService  = require ("../services/orderService")
const cartService  = require ("../services/cartService")

//recupera las ordenedes generadas
const getOrders = async (req,res) => {
    try {
        let id = req.user.id;
        
        let prods = await orderService.getOrders(id);
        prods
            ? res.status(200).json(prods)
            : res.status(404).json({"error": "order/s not found/s"})
        
    }
    catch (err) {
        res.status(400).json({
            msj:"failed to get orders",
            error: err.message
        })
    }

}

//craea una orden para la vista.
const createOrder = async (req, res) => {
    try {
        const newProd  = await orderService.createOrder(req.user);
        newProd
            ? res.status(200).json({"exito": "todo salio bien, revisa tu casilla para la confirmacion"})
            : res.status(400).json({"error": "something went wrong with this request"})
    }
    catch (err) {
        res.status(400).json({
            msj:"failed to save orders ",
            error: err.message
        }) 
    }
}

module.exports = {createOrder, getOrders}