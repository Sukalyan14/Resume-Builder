const fs = require('fs')

// const send_mail = require('../middleware/sendVerificationMail')
const RegisterCheckCluster0 = require('../models/register_verify')
const generate_token = require("./generateToken")
const sendMail = require("./sendMail")
const generateJWT = require('./generatejwt')
const handleErrors = require('../errorHandlers/auth_errors')

//Base Constants
const duration = process.env.TOKEN_DURATION
const web_token_duration = process.env.JWT_DURATION
// const saltRounds = 10
const datetime_current = new Date();
const time_stamp = datetime_current.toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"})

const register = async(req , res) => {

    const { email , password } = req.body
    const { token } = generate_token()

    try{
        const user = await RegisterCheckCluster0.create({
            email ,
            password ,
            session_token:token
        }) 
        const webtoken = generateJWT(user._id)
        res.cookie('cookie-token' , webtoken , { httpOnly:true , maxAge:web_token_duration * 1000})
        res.status(201).json({ user: user._id })
    }
    catch(err){
        // console.log(err , "auth error print line 33");
        const errors = handleErrors(err)
        
        res.status(400).json({ errors })
    }
}

const verifyEmail = async (req , res) => {
    
    const token = req.query.key
    
    //Check if email is already validated or not here
    let token_check_result = await RegisterCheckCluster0.find({
        session_token: token,
    })

    //Check token validity
    const datetime_current = new Date()
    let diff = (datetime_current - token_check_result[0].date)/1000
    
    if(diff >= duration && token) {
        console.log("token is invalid");
        res.writeHead(404 , {'Content-Type': 'text/html'})
        fs.readFile('./emailTemplates/error.html' , null , (error , data) => {
            if(error){
                res.write("Oops , link might be invalid")
            } else {
                res.write(data)
            }
            res.end()
        })
    } else if(diff < duration && token){
        console.log("token vaild email verified");
        res.writeHead(200 , {'Content-Type': 'text/html'})
        fs.readFile('./emailTemplates/success.html' , null , (error , data) => {
            if(error){
                res.write("Congratulations! Your email address was successfully verified. You can now login to your account.")
            } else {
                res.write(data)
            }
            res.end();
        })
    }
}

module.exports = { register , verifyEmail }


