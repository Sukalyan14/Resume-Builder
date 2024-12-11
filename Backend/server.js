// Packages , imports and ports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const { createServer } = require('http')
const conf = require('./config/config.js') 
const router = require('./routes/auth_route.js');
const socketHandler = require('./socket/socketHandler')
const connectDb = require('./db/connect.js')
require('dotenv').config();
//Loads the handlebars module
// const handlebars = require('express-handlebars');

const app = express();
const httpServer = createServer(app)

// const allowed_origins = ['http://localhost:5173'];
const port = conf.PORT

const corsConfig = {
    origin:conf.FRONTEND_BASEURL,
    credentials:true,
    method:['GET' , 'POST']
}

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser())
app.use(cors(corsConfig));

// Register the routes with appropriate paths
app.use('/auth', router);

//Socket connect
socketHandler.initSocket(httpServer , corsConfig)

const start = async () => {
    try{
        await connectDb(conf.db.MONGO_CONNECT_STRING)
        httpServer.listen(port, () => console.log(`Db Connected && Server Listening at ${port}....`));
    }
    catch(err){
        console.log(err);
    }
}

start()
