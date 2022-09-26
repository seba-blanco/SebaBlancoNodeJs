let { DEFAULTSTORE } = require('../config/global')

const {ProductsDAOFile} =  require('../DAOS/products/ProductsDAOFile');
const {ProductsDAOMongo} =  require('../DAOS/products/ProductsDAOMongo');

const {cartsDAOFile} =  require('../DAOS/carts/cartsDAOFile');
const {CartsDAOMongo} =  require('../DAOS/carts/cartsDAOMongo');

const {UsersDAOMongo} = require('../DAOS/users/UsersDAOMongo');

const {ChatsDAOMongo} = require('../DAOS/chats/ChatsDAOMongo');
const {ChatsDAOFile} = require('../DAOS/chats/ChatsDAOFile');

let productsDAO;
let cartsDAO;
let usersDAO;
let chatsDAO;

switch (DEFAULTSTORE) {
    case 'MongoDB':
        cartsDAO = new CartsDAOMongo();
        productsDAO = new ProductsDAOMongo();
        usersDAO = new UsersDAOMongo();
        chatsDAO = new ChatsDAOMongo();
        break;
   
       
    default:
        cartsDAO = new cartsDAOFile();
        productsDAO = new ProductsDAOFile();
        usersDAO = new UsersDAOMongo();
        chatsDAO = new ChatsDAOFile();
        break;
}

module.exports ={productsDAO, cartsDAO, usersDAO, chatsDAO}