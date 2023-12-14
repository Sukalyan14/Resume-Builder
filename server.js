// Packages , imports and ports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
require('dotenv-expand').expand(require('dotenv').config())

const router = require('./routes/route.js');

//Loads the handlebars module
// const handlebars = require('express-handlebars');

const allowed_origins = ['http://localhost:1234'];
const port = process.env.PORT || 3300;

// Middleware
const app = express();

app.use(express.json());

app.use(morgan('tiny'));

// For Images in other statics
app.use(express.static('client/public'));

//Sets our app to use the handlebars engine
// app.set('view engine', 'handlebars');

// //Sets handlebars configurations (we will go through them later on)
// app.engine('handlebars', handlebars({
//     layoutsDir: __dirname + '/views/layouts',
// }));

// app.use(cors({
//   origin: allowed_origins[0],
//   optionsSuccessStatus: 200
// }));

app.use(cors());

// Register the routes with appropriate paths
app.use('/auth/register', router);
app.use('/message', router);

app.listen(port, () => console.log(`Server Listening at ${port}....`));

// MONGO_PASSWORD=YxeBg8i5JYFaSZnG