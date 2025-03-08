const RegisterCheckCluster0 = require('../../models/register_verify')
const generateToken = require("../../utils/generateToken")
const handleErrors = require('../../errorHandlers/auth_errors')
const sendMail = require('../../mailerSend/sendMail')
const conf = require('../../config/config')
const asyncWrapper = require('../../utils/asyncWrapper')
const CustomError = require("../../errorHandlers/CustomError")

const register = asyncWrapper( async (req , res , next) => {
    
    const { email , password , confirm_password } = req.body
    
    //Checks and individual responses
    if(!email) {
        const error = new CustomError("No email found. Please provide email, Its mandatory" , 404)
        return next(error)
    }

    if(!password){
        const error = new CustomError("No password . Please provide a password, Its mandatory" , 404)
        return next(error)
    }

    if(password !== confirm_password || !confirm_password){
        const error = new CustomError("Please confirm your password . Your password and confiramation does not match . Its mandatory" , 404)
        return next(error)
    }

    const verficationTokenDuration = conf.emailSender.VERIFICATION_TOKEN_DURATION

    //Check if email exists or not.
    let emailCheck = await RegisterCheckCluster0.findOne({ email })
    
    if(emailCheck){
        
        //Already a verified User
        if(emailCheck.verified) res.status(200).json({
            message: 'Already a registered User , Please Log-In',
            verified: emailCheck.verified 
        })

        const datetime_current = new Date()
        const diff = (datetime_current - emailCheck.date)/1000
        
        //Token Expired, so update the token and resend email
        if(diff >= verficationTokenDuration) {
            console.log("here")
            const { token } = generateToken()
            const verificationLink = `${conf.VERIFY_ENDPOINT_URL()}?key=${token}`

            await RegisterCheckCluster0.updateOne(
                { email }, //filter
                { $set:{
                    session_token:token,
                    date:datetime_current
                } } //update values
            )

        } else {

            const verificationLink = `${conf.VERIFY_ENDPOINT_URL()}?key=${emailCheck.session_token}`

            const response = await sendMail(email , verificationLink)
            console.log(response)
        }

        res.status(200).json({ 
                message:'A verification links has been send to your email . Please Verify the email' ,
                verified : emailCheck.verified })
        
    } else {
        const { token } = generateToken()
        const user = await RegisterCheckCluster0.create({
            email , password , 
            session_token:token
        })

        res.status(201).json({
            message:'A verification links has been send to your email . Please Verify the email',
        })
    }

})

module.exports = register 