const fs = require('fs')
const RegisterCheckCluster0 = require('../../models/register_verify')
const conf = require('../../config/config')


const verifyEmail = async (req , res) => {

    //Find a way to get email as well
    // console.log(req)
    const token = req.query.key
    
    //Base Constants
    const verficationTokenDuration = conf.oAuthMail.VERIFICATION_TOKEN_DURATION
    
    //Check if email is already validated or not here
    let token_check_result = await RegisterCheckCluster0.find({
        session_token: token,
    })

    if(token_check_result.length > 0 && token) {

        const datetime_current = new Date()
        let diff = (datetime_current - token_check_result[0].date)/1000
        
        if( diff >= verficationTokenDuration && token === token_check_result[0].session_token ) {

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
        } else {

            console.log("token vaild email verified");

            res.writeHead(200 , {'Content-Type': 'text/html'})
            
            //if readFile fails just show message . If readfile is successful the show template
            fs.readFile('./emailTemplates/success.html' , null , async (error , data) => {
                if(error){
                    res.write("Congratulations! Your email address was successfully verified. You can now login to your account.")
                } else {
                    res.write(data)
                }
                const update_verification_status = await RegisterCheckCluster0.updateOne(
                    { session_token: token } ,
                    { $set: { verified:true } } ,
                    { new:true}
                )
                res.end()

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
            })
        }
    } else {
        console.log("Issue Detected . Unable to verify")
        res.writeHead(404 , {'Content-Type': 'text/html'})

        fs.readFile('./emailTemplates/error.html' , null , (error , data) => {
            if(error){
                res.write("Oops , link might be invalid")
            } else {
                res.write(data)
            }
            res.end()
        })
    }
    
    //Check token validity
    
}

module.exports = verifyEmail 
