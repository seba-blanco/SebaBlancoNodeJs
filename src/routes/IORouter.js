const {chatsDAO} = require("../DAOS/defaultDaos");
const productService  = require ("../services/productService")

async function SocketManager (socket, io) {
    
        console.log('Cliente conectado');
        let allProds = productService.getAllProd();

        let allMessages = await chatsDAO.getAll();
        const dataContainer = {id:1, posts:[]};
        dataContainer.posts = allMessages;

        console.log(util.inspect(normalizeChat(dataContainer),true, 10, true) );
        
        socket.emit('welcome', {products:allProds, chat: allMessages});
    

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