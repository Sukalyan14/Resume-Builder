// Packages , imports and ports
const express = require('express')
const cors = require('cors')
const path = require('path')
const route = require('./routes/route.js')
const port = process.env.PORT || 3000

//middleware
const app = express()

app.use(cors())
route(app)

// app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get("/message", (req, res) => {
    console.log("hit the  endpoint");
    res.json({ message: "Hello from server!" });
});

app.listen(port , console.log(`Server Listening at ${port}....`))

// "proxy": "http://localhost:3000",