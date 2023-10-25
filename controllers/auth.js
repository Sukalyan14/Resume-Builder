const nodemailer = require('nodemailer')
//will need async await when connected and fetching from db
const dummy = (req, res) => {
    // console.log("hit the  endpoint");
    res.json({ message: "Hello from server!" });
}

const register = (req , res) => {
    // let config = {
    //     service: process.env.MAIL_SERVICE_NAME,
    //     auth:{
    //         user: process.env.MAIL_USER_NAME,
    //         pass: process.env.MAIL_USER_PASSWORD
    //     }
    // }

    // let transporter = nodemailer.createTransport(config)

    // let message = {
    //     from:'sukalyannayak@gmail.com',
    //     to: req.
    // }
    console.log("hit the endpoint");
    console.log(req.body);
    res.json({ message: "hello from post endpoint"})
}
module.exports = { dummy , register }