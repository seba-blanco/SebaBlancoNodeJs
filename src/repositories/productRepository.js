//repository con operaciones CRUD que habla con el daos a traves de DTO.
const {productsDAO} = require("../DAOS/defaultDaos");
const productDTO = require ("../DTO/productDTO")

class ProductRepository {
    constructor() {
        this.dao = productsDAO
    }

    addProd = async (prod) => {
        return await productsDAO.saveProduct(productDTO(prod));
    };
      
    getAllProd = async () => {
        let prods = await productsDAO.getAll();
        let prodsDTO = prods.map(prod => productDTO(prod));
        return prodsDTO;
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
