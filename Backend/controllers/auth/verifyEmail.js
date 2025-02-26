const fs = require('fs')
const RegisterCheckCluster0 = require('../../models/register_verify')
const conf = require('../../config/config')
const socketHandler = require('../../socket/socketHandler')
const asyncWrapper = require('../../utils/asyncWrapper')

const verifyEmail = asyncWrapper( async (req , res , next) => {
    
    const token = req.query.key

    if(token){

        const verficationTokenDuration = conf.emailSender.VERIFICATION_TOKEN_DURATION

        let token_check_result = await RegisterCheckCluster0.findOne({
            session_token:token
        })

        if(token_check_result.length > 0) {
            const datetime_current = new Date()
            let diff = (datetime_current - token_check_result[0].date)/1000

            if(diff < verficationTokenDuration && token === token_check_result.session_token){
                
                await RegisterCheckCluster0.updateOne(
                    { session_token: token },
                    { $set: {
                        verified:true
                    }} , 
                    { new: true } //returns updated document 
                )
                //Emitting event for the frontend to catch
                socketHandler.emailVerificationCheck(token_check_result[0].email , true)

                //Returning success template 
                res.writeHead(200 , {'Content-Type': 'text/html'})
                fs.readFile('../../mailerSend/emailTemplates/success.html' , 'utf-8' , async (error , data) => {
                    if(error){
                        res.write("Congratulations! Your email address was successfully verified. You can now login to your account.")
                    } else {
                        const processesHTML = data.replaceAll('${REDIRECT_URL}' , 'http://localhost:5173/')
                    
                        res.write(processesHTML)
                    }
                    res.end()
                })

            } else {
                //Return Error template
                res.writeHead(404 , {'Content-Type': 'text/html'})
                const message = "Verification Token Expired"
                fs.readFile('./emailTemplates/error.html' , 'utf8' , (error , data) => {
                    if(error){
                        res.write(message)
                    } else {
                        const processesHTML = data.replace('${message}' , message )
                        res.write(processesHTML)
                    }
                    res.end()
                })
            }
        }

    } else {
        res.writeHead(404 , {'Content-Type': 'text/html'})
            const message = "Invalid Link , Token not found"
            fs.readFile('../../mailerSend/emailTemplates/error.html' , null , (error , data) => {
                if(error){
                    res.write(message)
                } else {
                    const processesHTML = data.replace('${message}' , message )
                    
                    res.write(processesHTML)
                }
            res.end()
        })
    }
})

module.exports = verifyEmail 
