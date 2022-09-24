const {productsDAO} = require("../DAOS/defaultDaos");
const productDTO = require ("../DTO/productDTO")

class ProductRepository {
    constructor() {
        this.dao = productsDAO
    }

    addProd = async (prod) => {
        return await productsDAO.save(productDTO(prod));
    };
      
    getAllProd = async () => {
        return await productsDAO.getAll().map(prod => productDTO(prod));
    };
      
      
    getById = async (id) => {
        return await productDTO(productsDAO.getById(id));
    };
      
        
    updateProd  = async (prod, id) => {
        return await productsDAO.update(prod, id);
    };
        
      
    deleteProd = async (id) => {
        await productsDAO.delete(id)
    }

}




module.exports = new ProductRepository;
