const nodemailer = require("nodemailer")
const hbs = require('nodemailer-express-handlebars');
const { OAuth2Client } = require('google-auth-library')
const path = require('path');
const { error } = require("console");

//env variables
const {  MAIL_SERVICE_NAME ,
         MAIL_SERVICE_SECURE ,
         MAIL_SERVICE_PORT , 
         USER_NAME ,
         CLIENT_ID ,
         CLIENT_SECRET ,
         REFRESH_TOKEN ,
         REDIRECT_URI
      } = process.env


//For accessing the access token .This one refreshes after a certain in interval . Check.env file
const oauth2Client = new OAuth2Client(
    CLIENT_ID ,
    CLIENT_SECRET , 
    REDIRECT_URI
)

// Set the refresh token
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail =  (from , to , subject , template , context) => {
    return new Promise( async (resolve , reject) => {

        try {
            
            //Getting the access token
            const { token:accessToken } = await oauth2Client.getAccessToken()

            //smtp config details and creating nodemailer transporter 
            let nodemailerTransporter = nodemailer.createTransport({
                service : MAIL_SERVICE_NAME,
                port: MAIL_SERVICE_PORT, // or the appropriate port for your SMTP server
                secure: MAIL_SERVICE_SECURE, // true for 465, false for other ports
                auth: {
                    type:'OAuth2',
                    user : USER_NAME,
                    // pass : USER_PASSWORD,
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken
                }
            })
    
            //configuring and compiling handlebars
            nodemailerTransporter.use('compile' , hbs({
                viewEngine: {
                    extname: '.handlebars',
                    layoutsDir: path.join(__dirname, '../emailTemplates'),
                    partialsDir: path.join(__dirname, '../emailTemplates'),
                    defaultLayout:false
                },
                viewPath: path.join(__dirname, '../emailTemplates'),
                extname: '.handlebars'
            }))

            nodemailerTransporter.sendMail({
                from , to , 
                subject , 
                template , 
                context
            } , (error , response) => {
                if(error){
                    // console.log("There is an error in sending mail , line 43 sendMail" + error);
                    return reject(error)
                } else {
                    // console.log("sendmail line 50 " , response)
                    return resolve(response)
                }
            })      

        } 
        catch(err) {
            console.log("unable to get token" ,err)
            throw err
        }
    })
    
}

module.exports = sendMail

// layoutsDir: './emailTemplates',
// partialsDir: './emailTemplates',
// defaultLayout: 'emailVerifications'