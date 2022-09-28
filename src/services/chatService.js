const  chatRepository = require("../repositories/chatRepository");

const {logger} = require('../utils/logger4');


const getChats = async (id) => {
  try {
    return await chatRepository.getChats();
    }
    catch (err) {
      logger.error(err);
    }
  

};


const getChatByEmail = async(email)=> {
    try {
      return  await chatRepository.getChatByEmail(email); 
    }
    catch (err) {
      logger.error(err);
    }  
    
  }


module.exports ={
    getChats,
    getChatByEmail

   
}
 
    