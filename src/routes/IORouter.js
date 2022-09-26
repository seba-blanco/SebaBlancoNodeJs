const util = require('util')
const {chatsDAO} = require("../DAOS/defaultDaos");
const productService  = require ("../services/productService");
const {normalizeChat} = require('../utils/chatNormalizr');
let moment = require('moment'); 


async function SocketManager (socket, io) {
    
        socket.on('showData', async (data)=> {
            console.log('Cliente conectado');
            let allProds = await productService.getAllProd();

            console.log(allProds);

            let allMessages = await chatsDAO.getAll();
            
            socket.emit('welcome', {products:allProds, chat: allMessages});

        });
        
    

        socket.on('newProduct', async (data) => {
            
            await productService.addProd(data);
            let prodsUpdated = productService.getAllProd();
            io.sockets.emit('products', prodsUpdated);
        });

        socket.on('newMessage', async (data) => {
        
            data.message['tiemstamp'] = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
            console.log("nuevo mensaje");
            console.log(data);
            await chatsDAO.save(data);
            
        
            let allMessages = await chatsDAO.getAll();
            console.log("al messages");
            console.log(allMessages);
            
            io.sockets.emit('chatMessages', {chat:allMessages});
        })
    
}

module.exports =  {SocketManager}