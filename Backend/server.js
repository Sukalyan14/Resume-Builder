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
const CustomError = require('./errorHandlers/CustomError');
const globalErrorHandler = require('./errorHandlers/globalErrorHandler');
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
//Securing routes
app.all('*' , (req , res , next) => {
    const err = new CustomError(`Can't find the ${req.originalUrl} on the server` , 404)
    next(err)
})

//Global Error handler
app.use(globalErrorHandler)

//Socket connect
socketHandler.initSocket(httpServer , corsConfig)

//Start the server
const server = async () => {
    try{
        await connectDb(conf.db.MONGO_CONNECT_STRING)
        httpServer.listen(port, () => console.log(`Db Connected && Server Listening at ${port}....`));
    }
    catch(err){
        console.log(err);
    }
}

server()

//Handle Expections
process.on('unhandledRejection' , (err) => {
    console.log(err.name , err.message)
    console.log('Unhandled Rejection Occured, shutting down')

    httpServer.close(() => {
        process.exit(1)
    })
})

process.on('uncaughtException' , (err) => {
    console.log(err.name , err.message)
    console.log('Unhandled Expection Occured, shutting down')

    httpServer.close(() => {
        process.exit(1)
    })
})
