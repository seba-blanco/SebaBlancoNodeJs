const  productRepository = require("../repositories/productRepository");

const addProd = async (p) => {
  return await productRepository.addProd(p);
};

const getAllProd = async (id) => {
  if (id)
    return await productRepository.getById(id);
  else 
    return await productRepository.getAll();

};

const updateProd = async (prod, id) => {
    await productRepository.updateProd(prod,id);
}

const deleteProd = async(id)=> {
    await productRepository.delete(id);
}

module.exports ={
    addProd,
    getAllProd,
    updateProd,
    deleteProd
}
 
    