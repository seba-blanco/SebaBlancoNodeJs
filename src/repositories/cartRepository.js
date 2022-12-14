//repository con operaciones CRUD que habla con el daos a traves de DTO.

const {cartsDAO} = require("../DAOS/defaultDaos");
const cartDTO = require ("../DTO/cartDTO")

class cartRepository {
    constructor() {
        this.dao = cartsDAO
    }

    createCart = async (cart) => {
        let DTOCart = cartDTO(cart);
        return await cartsDAO.saveCart(DTOCart);
    };
      
    getCarts = async () => {
        
        let carts = await cartsDAO.getAll();
        let cartsDTO = carts.map(cart => cartDTO(cart));
        return cartsDTO;
    };
      
      
    getCartById = async (id) => {
        
        return await cartDTO(cartsDAO.getById(id));
    };
      
        
    updateCart  = async (prod, id) => {
       return await cartsDAO.update(id,prod );
    };
        
      
    deleteCart = async (id) => {
        await cartsDAO.delete(id)
    }

    deleteProdInCart = async (id, id_prod) => {
        await cartsDAO.deleteProdInCart(id, id_prod);
    }

    getCartForUser = async (id) =>{
       return await cartsDAO.getCartForUser(id);
    }

}




module.exports = new cartRepository;
