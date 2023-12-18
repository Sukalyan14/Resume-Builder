const nodemailer = require('nodemailer')
const crypto = require('node:crypto')
const hbs = require('nodemailer-express-handlebars');
const bcrypt = require('bcrypt')
const inlineBase64 = require('nodemailer-plugin-inline-base64');

const RegisterCheckCluster0 = require('../models/register_verify')

//will need async await when connected and fetching from db

const register = async (req , res) => {
    // let emailId = req.body.email
    // console.log(emailId);
    
    try{
        await sendVerificationEmail(req.body.email , req.body.password)

        res.status(201).json({
            status: 'Success',
            message: "Verification email sent"
        })
    }
    catch(error){
        res.status(500).json({
            status: 'Failed',
            message: 'Unable to Send mail'
        })
    }

    // return true
}

async function sendVerificationEmail(emailId , password){
    try{
        const saltRounds = 10
    
        let current_date = (new Date()).valueOf().toString();
        let random = Math.random().toString();
        let token = crypto.createHash('MD5').update(current_date + random).digest('hex');

        // bcrypt.hash(password , saltRounds , async function(err , hash) {

        //     const register_data = await RegisterCheckCluster0.create({
        //         email : emailId ,
        //         session_token : token ,
        //         password : hash , 
        //         verified : false
        //     })
        //     console.log(register_data);
        // })
        
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

        nodemailerTransporter.sendMail({
            from: process.env.ADMIN_MAIL,
            to:emailId,
            subject:'Email Verification',
            template: 'emailVerifications',
            context:{
                logoUrl : process.env.LOGO_URL,
                verificationLink: verificationLink ,
            }
        });
    }
    catch(error){
        console.log(error);
    }
    
}

module.exports = { register }

