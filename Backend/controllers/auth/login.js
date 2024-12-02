const UserSessionCluster = require('../../models/user_session')
const RegisterCheckCluster0 = require('../../models/register_verify')
const { generateJWT } = require('../../utils/generatejwt')
const handleErrors = require('../../errorHandlers/auth_errors')
const conf = require('../../config/config')
const bcrypt = require('bcryptjs')

const login = async (req , res) => {

    //Constant
    const httpOnly = conf.cookies.HTTP_ONLY
    const secure = conf.cookies.SECURE
    const sameSite = conf.cookies.SAME_SITE
    const domain = conf.cookies.DOMAIN

    const jwtDuration = conf.jwt.JWT_DURATION

    const { email , password } = req.body
    
    const registeredUserCheck = await RegisterCheckCluster0.findOne({
        email
    })

    if(registeredUserCheck){

        //check password
        if(await bcrypt.compare(password , registeredUserCheck.password)){
            //password matched   

            const user = await UserSessionCluster.create({
                email,
                password,
                logInTime:Date.now()              
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
                res.status(200).json({
                    user:user._id,
                    message:"Login Successful"
                })
            } else {
                res.status(500).json({message:"Login Failed"})
            }
            
        } else {
            res.status(400).json({message:"Incorrect password"})
        }
        
    } else {
        res.status(500).json({message:"Not a registered User. Please Signup first"})
    }

}

module.exports = login