const  cartRepository = require("../repositories/cartRepository");
const {logger} = require('../utils/logger4');

const createCart = async (p) => {
  try {
    return await cartRepository.createCart(p);
  }
  catch (err) {
    logger.error(err);
  }
  
};

const getCarts = async (id) => {
  try {
    if (id && id != 0)
      return await cartRepository.getCartById(id);
    else 
      return await cartRepository.getCarts();
    }
    catch (err) {
      logger.error(err);
    }
  

};

const updateCart = async (cart, id) => {
  try {
    await cartRepository.updateCart(cart,id);
  }  
  catch (err) {
    logger.error(err);
  }
}

const deleteCart = async(id)=> {
  try {
   await cartRepository.deleteCart(id); 
  }
  catch (err) {
    logger.error(err);
  }  
  
}

const deleteProdInCart = async(id, id_prod)=> {
    try {
        await cartRepository.deleteProdInCart(id, id_prod); 
    }
    catch (err) {
        logger.error(err);
    }  

}

const getCartForUser = async(id)=> {
    try {
     await cartRepository.getCartForUser(id); 
    }
    catch (err) {
      logger.error(err);
    }  
    
  }

module.exports ={
    createCart,
    getCarts,
    updateCart,
    deleteCart,
    getCartForUser,
    deleteProdInCart
   
}
 
    