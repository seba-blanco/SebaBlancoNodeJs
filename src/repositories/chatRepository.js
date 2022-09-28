//repository con operaciones CRUD que habla con el daos a traves de DTO.

const {chatsDAO} = require("../DAOS/defaultDaos");
const chatDTO = require ("../DTO/chatDTO")

class orderRepository {
    constructor() {
        this.dao = chatsDAO
    }

    getChats = async () => {
        
        let orders = await chatsDAO.getAll();
       
        return orders;
    };
      
      
    getChatByEmail = async (id) => {
        
        return await chatsDAO.getChatByEmail(id);
    };
      


}




module.exports = new orderRepository;
