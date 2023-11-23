// Packages , imports and ports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
require('dotenv-expand').expand(require('dotenv').config())

const router = require('./routes/route.js');

const allowed_origins = ['http://localhost:1234'];
const port = process.env.PORT || 3300;

// Middleware
const app = express();

app.use(express.json());

app.use(morgan('tiny'))


// app.use(cors({
//   origin: allowed_origins[0],
//   optionsSuccessStatus: 200
// }));

app.use(cors());

// Register the routes with appropriate paths
app.use('/auth/register', router);
app.use('/message', router);

app.listen(port, () => console.log(`Server Listening at ${port}....`));

// "proxy": "http://localhost:3000",