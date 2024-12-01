const RegisterCheckCluster0 = require('../../models/register_verify')
const generate_token = require("../../utils/generateToken")
const handleErrors = require('../../errorHandlers/auth_errors')
const sendMail = require('../../utils/sendMail')
const conf = require('../../config/config')

const register = async(req , res) => {

    const { email , password } = req.body
    
    //Base Constants
    const verficationTokenDuration = conf.oAuthMail.VERIFICATION_TOKEN_DURATION

    try{
        //Check if email is already validated or not here
        let emailCheck = await RegisterCheckCluster0.find({
            email,
        })
        
        //Previously tried registering but failed . //Update the session token if token expired pending
        if(emailCheck.length !== 0 && emailCheck[0].verified === false){
            
            const datetime_current = new Date()
            let diff = (datetime_current - emailCheck[0].date)/1000

            //sendmail
            const emailSubject = "Email Verification"
            const emailTemplate = 'emailVerifications'
            const logoUrl = conf.oAuthMail.LOGO_URL

            if(diff >= verficationTokenDuration) {
                //sendmail and update time and token in db
                const { token } = generate_token()
                const verificationLink = conf.VERIFY_ENDPOINT_URL()+"?key="+token
                const update_verification_status = await RegisterCheckCluster0.updateOne(
                    { email },
                    { $set:{
                        session_token:token , 
                        date:datetime_current
                        }
                    }
                )

                if(update_verification_status.modifiedCount > 0){
                    
                    const mailResult = await sendMail(conf.oAuthMail.USER_NAME , email , emailSubject , emailTemplate , { logoUrl , verificationLink })
                    
                    // console.log('Verification Mail sent , Db updated')
                } else {
                    throw new Error('Verification Status Update Falied')
                }
                
            } else {
                //just sendmail
                const verificationLink = conf.VERIFY_ENDPOINT_URL()+"?key="+emailCheck[0].session_token

                const mailResult = await sendMail(conf.oAuthMail.USER_NAME , email , emailSubject , emailTemplate , { logoUrl , verificationLink })

            }
            res.status(201).json({ message:'A verification links has been send to your email . Please Verify' , verified : emailCheck[0].verified })  
        }
        //Already registered 
        else if(emailCheck.length !== 0 && emailCheck[0].verified === true){
            console.log("here2")
            //User pls login
            res.status(201).json({ message:'Already a registered User , Please Log-In' , verified : emailCheck[0].verified})    
        } 
        //Completely new user
        else {
            console.log("here3")
            const { token } = generate_token()
            // completely new user
            const user = await RegisterCheckCluster0.create({
                email ,
                password ,
                session_token:token
            }) 
            
            if(user) res.status(201).json({ message:'A verification links has been send to your email . Please Verify ' , verified : user.verified })    
            
        }
        
        
    }
    catch(err){
        // console.log(err , "auth error print line 33");
        const errors = handleErrors(err)
        
        res.status(400).json({ errors })
    }
}

module.exports = register 
