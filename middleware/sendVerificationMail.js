const nodemailer = require('nodemailer')
const crypto = require('node:crypto')
const hbs = require('nodemailer-express-handlebars');
const bcrypt = require('bcryptjs')

const RegisterCheckCluster0 = require('../models/register_verify')

//check if email already exists in db or is within the time range of prev token
async function sendVerificationEmail(emailId , password){
    try{
        // console.log("hello");
        const saltRounds = 10
        const date = new Date();
        const time = `${date.getHours()}:${date.getMinutes()}`

        // let mail_register_check = await RegisterCheckCluster0.find({
        //     email: emailId,
        //     // verified:true
        // })
        let mail_register_check = []
        // console.log(mail_register_check);
        
        //Checking if mail is already registered or not
        if (mail_register_check.length === 0){
            time_stamp = mail_register_check.time_stamp
            
            const current_date = (new Date()).valueOf().toString();
            let random = Math.random().toString();
            let token = crypto.createHash('MD5').update(current_date + random).digest('hex');
            
            let verificationLink = process.env.VERIFY_END_POINT_URL+"?key="+token;  //Store in db for a specific user-session
    
            let config = {
                service : process.env.MAIL_SERVICE_NAME,
                port: process.env.MAIL_SERVICE_PORT, // or the appropriate port for your SMTP server
                secure: process.env.MAIL_SERVICE_SECURE, // true for 465, false for other ports
                auth:{
                    user :process.env.MAIL_USER_NAME,
                    pass :process.env.MAIL_USER_PASSWORD
                }
            }
    
            let nodemailerTransporter = nodemailer.createTransport(config)
    
            let options = {
                viewEngine: {
                    extname: '.handlebars',
                    layoutsDir: './emailTemplates',
                    partialsDir: './emailTemplates',
                    defaultLayout: 'emailVerifications'
                },
                viewPath: './emailTemplates',
                extname: '.handlebars'
            }
    
            nodemailerTransporter.use('compile' , hbs(options))
    
            const info = await nodemailerTransporter.sendMail({
                from: process.env.ADMIN_MAIL,
                to:emailId,
                subject:'Email Verification',
                template: 'emailVerifications',
                context:{
                    logoUrl : process.env.LOGO_URL,
                    verificationLink: verificationLink ,
                }
            });
            // console.log(info , "info");
            if (info.accepted.length > 0){
                // bcrypt.hash(password , saltRounds , async function(err , hash) {
                //     const register_data = await RegisterCheckCluster0.create({
                //         email : emailId ,
                //         session_token : token ,
                //         password : hash , 
                //         date:date,
                //         time_stamp : time ,
                //         verified : false
                //     })
                // })
                return {
                    info,
                    message: 'Email Sent Successfully'
                }
            } else {
                throw new Error('Mail Not Sent')
            }            
        }
    }
    
    catch(error){
        console.log(error);
        return {
            error , 
            message : 'Unable to send email , server error. Pls try later'
        }
    }
}

module.exports = { sendVerificationEmail }