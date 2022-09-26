const  productRepository = require("../repositories/productRepository");
const {logger} = require('../utils/logger4');

const addProd = async (p) => {
  try {
    return await productRepository.addProd(p);
  }
  catch (err) {
    logger.error(err);
  }
  
};

const getAllProd = async (id) => {
  try {
    if (id)
      return await productRepository.getById(id);
    else 
      return await productRepository.getAllProd();
    }
    catch (err) {
      logger.error(err);
    }
  

};

const updateProd = async (prod, id) => {
  try {
    await productRepository.updateProd(prod,id);
  }  
  catch (err) {
    logger.error(err);
  }
}

const deleteProd = async(id)=> {
  try {
   await productRepository.delete(id); 
  }
  catch (err) {
    logger.error(err);
  }  
  
}

module.exports ={
    addProd,
    getAllProd,
    updateProd,
    deleteProd
}
 
    