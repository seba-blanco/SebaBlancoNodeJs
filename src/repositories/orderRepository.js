const { company } = require("faker/lib/locales/az");
const {ordersDAO} = require("../DAOS/defaultDaos");
const orderDTO = require ("../DTO/orderDTO")

class orderRepository {
    constructor() {
        this.dao = ordersDAO
    }

    createOrder = async (cart, username, useremail) => {
        let order = {
            user:username,
            userEmail:useremail,
            prods: cart.prods,
            status:'generada'
        };
        
        let DTOOrder = orderDTO(order);
       
        await ordersDAO.saveOrder(DTOOrder);

        return DTOOrder;
    };
      
    getOrders = async () => {
        
        let orders = await ordersDAO.getAll();
       
        return orders;
    };
      
      
    getOrderById = async (id) => {
        
        return await ordersDAO.getById(id);
    };
      


}




module.exports = new orderRepository;
