//todo el manejo para el chat esta aca.

const util = require('util')
const {chatsDAO} = require("../DAOS/defaultDaos");
const productService  = require ("../services/productService");
const cartService  = require ("../services/cartService");
let moment = require('moment'); 


async function SocketManager (socket, io) {
    
        socket.on('showData', async (data)=> {
            let allProds = await productService.getAllProd();

            let allMessages = await chatsDAO.getAll();
            
            socket.emit('welcome', {products:allProds, chat: allMessages});

        });
        
    

        socket.on('newProduct', async (data) => {
            
            await productService.addProd(data);
            let prodsUpdated = productService.getAllProd();
            io.sockets.emit('products', prodsUpdated);
        });

        socket.on('newMessage', async (data) => {
        
            data['datetime'] = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
            await chatsDAO.saveChat(data);
            
        
            let allMessages = await chatsDAO.getAll();
            
            io.sockets.emit('chatMessages', {chat:allMessages});
        })

        socket.on('addProdToCart', async (id) => {

            await cartService.updateCart(id);
        });
    
}

module.exports =  {SocketManager}