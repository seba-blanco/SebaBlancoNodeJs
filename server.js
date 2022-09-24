const express = require('express');
const session = require('express-session')
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;


const parseArgs = require('minimist');
const options = {default:{PORT:8080, SERVER_MODE:'FORK'}};

const args = parseArgs(process.argv.slice(2), options);//parseArgs[, options];

const { Server: HttpServer } = require('http');


const {loginRouter} = require('./src/routes/logInRouter');
const {passport} = require('./src/config/passport-config');

const randomRouter = require('./src/routes/RandomRouter');

//TO DO: BORRAR
const prodRouter = require('./src/routes/ProductRouter');

const { EXPIRATION_TIME } = require('./src/config/global')
const {productsDAO, chatsDAO} = require("./src/DAOS/defaultDaos");

const path = require('path')
const app = express();
const httpServer = new HttpServer(app);



app.use(session({
    secret: 'Peron',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: parseInt(EXPIRATION_TIME)
    },
    rolling: true,
    resave: true,
    saveUninitialized: true
}))



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize())
app.use(passport.session())

app.use("/", loginRouter);
app.use("/api/", randomRouter);
app.use("/api/productos", prodRouter);

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
 
const PORT = parseInt(process.argv[2]);
const SERVER_MODE = args['SERVER_MODE'];

if (SERVER_MODE =='FORK') {
    httpServer.listen(PORT, () => {
        console.log('SERVER ON en http://localhost:' + PORT);
    
    });
    httpServer.on("Error", (error) => console.log(`error en servidor ${error}`));
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