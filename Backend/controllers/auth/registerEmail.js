const RegisterCheckCluster0 = require('../../models/register_verify')
const generateToken = require("../../utils/generateToken")
const handleErrors = require('../../errorHandlers/auth_errors')
const sendMail = require('../../utils/sendMail')
const conf = require('../../config/config')

const register = async(req , res) => {

    const { email , password , confirm_password } = req.body
    
    //Base Constants
    const verficationTokenDuration = conf.oAuthMail.VERIFICATION_TOKEN_DURATION
    
    try{
        if(email && password && confirm_password && password === confirm_password) {
            //Check if email is already validated or not here
            let emailCheck = await RegisterCheckCluster0.findOne({
                email,
            })

            //Check if user has a record or not
            if(emailCheck){
                //Check status
                if(emailCheck.verified) res.status(201).json({ message:'Already a registered User , Please Log-In' , verified : emailCheck.verified})    
                
                //Constants for email
                const emailSubject = "Email Verification"
                const emailTemplate = 'emailVerifications'
                const logoUrl = conf.oAuthMail.LOGO_URL

                // when verification is false
                
                //Token Duration Check
                const datetime_current = new Date()
                const diff = (datetime_current - emailCheck.date)/1000
                
                if(diff >= verficationTokenDuration) {
                    //Token Expired
                    const { token } = generateToken()
                    const verificationLink = conf.VERIFY_ENDPOINT_URL()+"?key="+token

                    await RegisterCheckCluster0.updateOne(
                        { email },
                        { $set:{
                            session_token:token , 
                            date:datetime_current
                            }
                        }
                    )

                    await sendMail(conf.oAuthMail.USER_NAME , email , emailSubject , emailTemplate , { logoUrl , verificationLink })

                } else {
                    // Token is valid
                    const verificationLink = conf.VERIFY_ENDPOINT_URL()+"?key="+emailCheck.session_token

                    await sendMail(conf.oAuthMail.USER_NAME , email , emailSubject , emailTemplate , { logoUrl , verificationLink })
                    
                }

                res.status(201).json({ message:'A verification links has been send to your email . Please Verify ' , verified : emailCheck.verified })
                
            } else {
                //Create Entry. Completely new user
                const { token } = generateToken()
                const user = await RegisterCheckCluster0.create({
                    email , password , 
                    session_token:token
                })

                res.status(201).json({ message:'A verification links has been send to your email . Please Verify ' , verified : emailCheck.verified })       
            }
                   
        } else {
            throw new Error('Please Fill the required Fields correctly')
        }
    }
    catch(err){
        // console.log("auth error print line 91" , err );
        const errors = handleErrors(err)
        
        res.status(400).json({ errors })
    }
}

module.exports = register 
