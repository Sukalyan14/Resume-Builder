const UserSessionCluster = require('../../models/user_session')
const RegisterCheckCluster0 = require('../../models/register_verify')
const { generateJWT } = require('../../utils/generatejwt')
const handleErrors = require('../../errorHandlers/auth_errors')
const conf = require('../../config/config')
const bcrypt = require('bcryptjs')

const login = async (req , res) => {

    try {
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

        if(registeredUserCheck && registeredUserCheck.verified){

            //check password
            const passwordCheck = bcrypt.compare(password , registeredUserCheck.password)
            if(passwordCheck){
                //password matched   
                const user = await UserSessionCluster.create({
                    email,
                    password,
                    logInTime:Date.now(),
                    logOutTime:null            
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
                        verified : registeredUserCheck.verified,
                        message:"Login Successful"
                    })
                } else {
                    // res.status(500).json({message:"Login Failed"})
                    throw new Error('Login Failed')
                }
                
            } else {
                // res.status(400).json({message:"Incorrect password"})
                throw new Error('Incorrect Password')
            }
            
        } else {
            // res.status(500).json({message:"Not a registered User. Please Signup first"})
            throw new Error('Not a registered User. Please Signup first')
        }
    
    } catch (err) {
        const errors = handleErrors(err)
        
        res.status(errors.status).json({ message:errors.message })
    }
    
}

module.exports = login