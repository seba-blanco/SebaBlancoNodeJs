const MongoDBContainer = require('../../containers/MongoDBContainer')
const chatModel = require('../../models/chat')

class ChatsDAOMongo extends MongoDBContainer{
  constructor() {
    super(chatModel);
    this.id = 0;
    this.checkId();
  }

  checkId = async () => {
    let chat = await this.getAll()

    if(chat.length > 0) {

      this.id = parseInt(Math.max(...chat.map(msj => msj.id), 0)) + 1
    }
  }
  
  saveChat = async(obj) => {
    this.save(obj, this.id);
    this.id++;
  }

  getChatByEmail = async (email) => {
    let chats =await this.model.find({email: email});
    return chats;
  }
  
  

} 

module.exports = { ChatsDAOMongo }
