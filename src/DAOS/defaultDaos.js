//setea todos los DAOS y segun la configuracion expone el que se va a usar.
let { DEFAULTSTORE } = require('../config/global')

const {ProductsDAOFile} =  require('../DAOS/products/ProductsDAOFile');
const {ProductsDAOMongo} =  require('../DAOS/products/ProductsDAOMongo');

const {cartsDAOFile} =  require('../DAOS/carts/cartsDAOFile');
const {CartsDAOMongo} =  require('../DAOS/carts/cartsDAOMongo');

const {UsersDAOMongo} = require('../DAOS/users/UsersDAOMongo');

const {ChatsDAOMongo} = require('../DAOS/chats/ChatsDAOMongo');
const {ChatsDAOFile} = require('../DAOS/chats/ChatsDAOFile');

const {OrdersDAOMongo} = require('../DAOS/orders/ordersDAOMongo');
const {OrdersDAOFile} = require('../DAOS/orders/ordersDAOFile');

let productsDAO;
let cartsDAO;
let usersDAO;
let chatsDAO;
let ordersDAO;

switch (DEFAULTSTORE) {
    case 'MongoDB':
        cartsDAO = new CartsDAOMongo();
        productsDAO = new ProductsDAOMongo();
        usersDAO = new UsersDAOMongo();
        chatsDAO = new ChatsDAOMongo();
        ordersDAO = new OrdersDAOMongo();
        break;
   
       
    default:
        cartsDAO = new cartsDAOFile();
        productsDAO = new ProductsDAOFile();
        usersDAO = new UsersDAOMongo();
        chatsDAO = new ChatsDAOFile();
        ordersDAO = new OrdersDAOFile();
        break;
}

module.exports ={productsDAO, cartsDAO, usersDAO, chatsDAO, ordersDAO}