const  orderRepository = require("../repositories/orderRepository");
const  cartRepository = require("../repositories/cartRepository");
const {sendNewOperationMail} = require("../utils/mailManager");

const {logger} = require('../utils/logger4');


//otra negrada para que funcione la interfaz.
const createOrder = async (user) => {
  try {
    let carrito = await cartRepository.getCartForUser(user.id);
    let orderCreated = await orderRepository.createOrder(carrito, user.username, user.email);

    await cartRepository.deleteCart(carrito.id);
    
    sendNewOperationMail(orderCreated);

    return orderCreated;
  }
  catch (err) {
    logger.error(err);
  }
  
};

const getOrders = async (id) => {
  try {
    if (id && id != 0)
      return await orderRepository.getOrderById(id);
    else 
      return await orderRepository.getOrders();
    }
    catch (err) {
      logger.error(err);
    }
  

};

module.exports ={
  createOrder,
    getOrders
   
}
 
    