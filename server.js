// Packages , imports and ports
const express = require('express');
const cors = require('cors');
const router = require('./routes/route.js');
const allowed_origins = ['http://localhost:1234'];
require('dotenv').config();
const port = process.env.PORT || 3300;

// Middleware
const app = express();

app.use(express.json());

app.use(cors({
  origin: allowed_origins[0],
  optionsSuccessStatus: 200
}));

console.log(process.env.PORT);
// console.log(console.log(require("dotenv").config()));
// Register the routes with appropriate paths
app.use('/auth/register', router);
app.use('/message', router);

app.listen(port, () => console.log(`Server Listening at ${port}....`));

// "proxy": "http://localhost:3000",