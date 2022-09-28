const express = require('express');
const session = require('express-session')
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const {logger} = require('./src/utils/logger4');


const parseArgs = require('minimist');
const options = {default:{PORT:8080, SERVER_MODE:'FORK'}};

const args = parseArgs(process.argv.slice(2), options);

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io')

const path = require('path')
const app = express();
app.use(express.static('./public'));

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


//creo el IO pero le derivo toda la logica al archivo socket manager.
io.on('connection', async socket => {
    SocketManager(socket, io);
});


//configuro  los routers para cada proceso.
const {loginRouter} = require('./src/routes/logInRouter');
const randomRouter = require('./src/routes/RandomRouter');
const {passport} = require('./src/config/passport-config');
const prodRouter = require('./src/routes/ProductRouter');
const cartRouter = require('./src/routes/CartRouter');
const orderRouter = require('./src/routes/OrderRouter');
const chatRouter = require('./src/routes/ChatRouter');

const { EXPIRATION_TIME } = require('./src/config/global')
const {SocketManager} = require('./src/routes/IORouter');


//seteo la configuracion de la session
app.use(session({
    secret: 'Peron',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: EXPIRATION_TIME
    },
    rolling: true,
    resave: true,
    saveUninitialized: true
}))



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize())
app.use(passport.session())


//seteo de cuales endpoints se va a ocupar cada rotuer.
app.use("/", loginRouter);
app.use("/api/", randomRouter);
app.use("/api/productos", prodRouter);
app.use("/api/carrito", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/chats", chatRouter);

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
 
const PORT = parseInt(process.argv[2]);
const SERVER_MODE = args['SERVER_MODE'];

if (SERVER_MODE =='FORK') {
    httpServer.listen(PORT, () => {
        console.log('SERVER ON en http://localhost:' + PORT);
    
    });
    httpServer.on("Error", (error) => logger.error(error));
}
else {
    if (cluster.isMaster) {
        
        for (let i=0; i<numCPUs; i++){
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });
    }
}