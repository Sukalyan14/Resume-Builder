const UserSessionCluster = require('../../models/user_session')
const RegisterCheckCluster0 = require('../../models/register_verify')
const { generateJWT } = require('../../utils/generatejwt')
const conf = require('../../config/config')
const bcrypt = require('bcryptjs')
const asyncWrapper = require('../../utils/asyncWrapper')
const CustomError = require("../../errorHandlers/CustomError")

const login = asyncWrapper( async (req , res , next) => {
    
    const { 
        HTTP_ONLY: httpOnly ,
        SECURE: secure ,
        SAME_SITE: sameSite,
        DOMAIN: domain
    } = conf.cookies

    const { JWT_DURATION: jwtDuration } = conf.jwt

    const { email , password } = req.body

    if(!email) {
        const error = new CustomError("No email found. Please provide email, Its mandatory" , 404)
        return next(error)
    }

    if(!password){
        const error = new CustomError("No password . Please provide a password, Its mandatory" , 404)
        return next(error)
    }

    const registeredUserCheck = await RegisterCheckCluster0.findOne({ email })

    //Check if user is verified or not
    if(registeredUserCheck && registeredUserCheck.verified){
        
        const passwordCheck = bcrypt.compare(password , registeredUserCheck.password)
        
        if(passwordCheck){
            
            const user = await UserSessionCluster.create({
                email , password ,
                logInTime: Date.now(),
                logOutTime:null
            })

            if(user){
                const webtoken = generateJWT(user._id)
                res.cookie('cookie-token' , webtoken , {
                    httpOnly ,
                    secure ,
                    maxAge: jwtDuration * 1000 ,
                    sameSite ,
                    credentials: true
                })

                res.status(200).json({
                    user: user._id ,
                    verified: registeredUserCheck.verified ,
                    message: 'Login Successful'
                })
            }

        } else {
            const error = new CustomError('Incorrect Password' , 401)
            return next(error)
        }

    } else {
        const error = new CustomError("Not a registered user. Please Sign-up First" , 404)
        return next(error)
    }
})

module.exports = login