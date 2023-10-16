// Packages , imports and ports
const express = require('express')
const cors = require('cors')
const path = require('path')
const route = require('./routes/route.js')
const router = require('./routes/route.js')
const port = process.env.PORT || 3000
const allowed_origins = ['http://localhost:1234']
//middleware
const app = express()

app.use(express.json())
app.use(cors({
    origin:allowed_origins[0],
    optionsSuccessStatus:200
}))
// route(app)
app.use('/auth/register' , router)
app.use('/message' , router)

app.listen(port , console.log(`Server Listening at ${port}....`))

// "proxy": "http://localhost:3000",