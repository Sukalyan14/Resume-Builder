// Packages , imports and ports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const conf = require('./config/config.js') 
require('dotenv').config();
const router = require('./routes/auth_route.js');
const connectDb = require('./db/connect.js')

//Loads the handlebars module
// const handlebars = require('express-handlebars');

const app = express();


const allowed_origins = ['http://localhost:5173'];
const port = conf.PORT

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser())
app.use(cors({
    origin:allowed_origins,
    credentials:true
}));

// Register the routes with appropriate paths
app.use('/auth', router);
// app.use('/auth/verify-email' , router)

const start = async () => {
    try{
        await connectDb(conf.db.MONGO_CONNECT_STRING)
        app.listen(port, () => console.log(`Db Connected && Server Listening at ${port}....`));
    }
    catch(err){
        console.log(err);
    }
}

start()
