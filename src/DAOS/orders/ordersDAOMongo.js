const MongoDBContainer = require('../../containers/MongoDBContainer')
const orderModel = require('../../models/Order')

class OrdersDAOMongo extends MongoDBContainer{
  constructor() {
    super(orderModel);
    this.id = 0;
    this.checkId();
  }

  checkId = async () => {
    let orders = await this.getAll()

    if(orders.length > 0) {

      this.id = parseInt(Math.max(...orders.map(order => order.id), 0)) + 1
    }
  }
  
  saveOrder = async(obj) => {
    this.save(obj, this.id);
    this.id++;

    return true;
  }
  
  getOrderForUser = async(idUser) => {
    let order = await this.model.findOne({userID: idUser});
    return order;
}
  

} 

module.exports = { OrdersDAOMongo }
