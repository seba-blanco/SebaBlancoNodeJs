//consume el serivce que habla con el repository.
const productService  = require ("../services/productService")

//todas las funciones CRUD para producto.
const getProducts = async (req,res) => {
    try {
        let id = req.params.id;
        
      
        let prods = await productService.getAllProd(id);
       if (prods.length> 0)
            res.status(200).json(prods)
        else
            res.status(404).json({"error": "product/s not found/s"})
        
    }
    catch (err) {
        res.json({
            msj:"failed to get products",
            error: err.message
        })
    }

}

const saveProd = async (req, res) => {
    try {
        const newProd  = await productService.addProd(req.body);
        newProd
            ? res.status(200).json(newProd)
            : res.status(400).json({"error": "something went wrong with this request"})
    }
    catch (err) {
        res.json({
            msj:"failed to save prod",
            error: err.message
        }) 
    }
}

const updateProd = async (req, res) => {
    try {
        const id = req.params.id;
        let newProd = await productService.updateProd(req.body, id);
        newProd
            ? res.status(200).json(newProd)
            : res.status(204).json({"error": "product to update was not found"})
    }
    catch (err) {
        res.json({
            msj:"failed to updateProd",
            error: err.message
        }) 
    }
}

const deleteProd = async (req, res) => {
    try {
        let id = req.params.id;
        const deletedProd  = await productService.deleteProd(id);
        
        deletedProd
            ? res.status(200).json(deletedProd)
            : res.status(204).json({"error": "product to delete was not found"})
    }
    catch (err) {
        res.json({
            msj:"failed to delete prod",
            error: err.message
        }) 
    }
}

module.exports = {getProducts
            ,saveProd
            ,updateProd
            ,deleteProd
            }