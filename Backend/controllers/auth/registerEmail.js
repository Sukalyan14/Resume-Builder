const RegisterCheckCluster0 = require('../../models/register_verify')
const generate_token = require("../../utils/generateToken")
const generateJWT = require('../../utils/generatejwt')
const handleErrors = require('../../errorHandlers/auth_errors')
const sendMail = require('../../utils/sendMail')
const conf = require('../../config/config')

const register = async(req , res) => {

    const { email , password } = req.body
    const { token } = generate_token()

    //Base Constants
    
    const jwtDuration = conf.jwt.JWT_DURATION
    const secure = conf.cookies.SECURE
    const httpOnly = conf.cookies.HTTP_ONLY
    const sameSite = conf.cookies.SAME_SITE
    const domain = conf.cookies.DOMAIN

    try{
        //Check if email is already validated or not here
        let emailCheck = await RegisterCheckCluster0.find({
            email,
        })
        
        //Previously tried registering but failed . 
        if(emailCheck.length !== 0 && emailCheck[0].verified === false){
            console.log("here1")
            //sendmail
            const verificationLink = conf.VERIFY_ENDPOINT_URL()+"?key="+token
            const emailSubject = "Email Verification"
            const emailTemplate = 'emailVerifications'
            const logoUrl = conf.oAuthMail.LOGO_URL

            const mailResult = await sendMail(conf.oAuthMail.USER_NAME , email , emailSubject , emailTemplate , { logoUrl , verificationLink })

            res.status(201).json({ message:'Please Verify your email id' })  

        }
        //Already registered 
        else if(emailCheck.length !== 0 && emailCheck[0].verified === true){
            console.log("here2")
            //User pls login
            res.status(201).json({ message:'Already a registered User' })    
        } 
        //Completely new user
        else {
            console.log("here3")
            // completely new user
            const user = await RegisterCheckCluster0.create({
                email ,
                password ,
                session_token:token
            }) 
    
            if(user){
                const webtoken = generateJWT(user._id)
                res.cookie('cookie-token' , webtoken , { 
                        httpOnly ,
                        secure ,
                        maxAge:jwtDuration * 1000 ,
                        sameSite,
                        credentials:true,
                        path:'/',
                        domain,
                    }
                )
    
                res.status(201).json({ user: user._id , message:'Please Verify Email' })    
            }
        }
        
        
    }
    catch(err){
        // console.log(err , "auth error print line 33");
        const errors = handleErrors(err)
        
        res.status(400).json({ errors })
    }
}

module.exports = register 
