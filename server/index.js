// Packages , imports and ports
const express = require('express')
const cors = require('cors')
const path = require('path')
const route = require('./routes/route.js')
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

// app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get("/message", (req, res) => {
    // console.log("hit the  endpoint");
    res.json({ message: "Hello from server!" });
});

app.post('/post' , (req , res) => {
    console.log("hit the endpoint");
    console.log(req.body);
    res.json({ message: "hello from post endpoint"})
})
app.listen(port , console.log(`Server Listening at ${port}....`))

// "proxy": "http://localhost:3000",