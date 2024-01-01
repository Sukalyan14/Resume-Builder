const nodemailer = require('nodemailer')
const crypto = require('node:crypto')
const hbs = require('nodemailer-express-handlebars');
const bcrypt = require('bcryptjs')

const RegisterCheckCluster0 = require('../models/register_verify');


//check if email already exists in db or is within the time range of prev token if present and is outside of the time range then simply update date , time stamp and token
// Need to prevent multiple entries of the same email in the db
async function sendVerificationEmail(emailId , password , duration){
    try{
        const saltRounds = 10
        const datetime_current = new Date();
        const time = datetime_current.toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"})

        //smtp config details
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

        // Check if mail exists in db
        let mail_register_check = await RegisterCheckCluster0.find({
            email: emailId,
        })
        
        //Mail Does Not Exists
        if(mail_register_check && mail_register_check.length === 0){
            //Generate token put the mail in the docs
            let { token , verificationLink } = generate_token()

            // Need to put proper checks that db entry is successful and mail is also sent , a scenario where 1 happens and other fails is to be prevented
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
            
            if (info.accepted.length > 0){
                bcrypt.hash(password , saltRounds , async function(err , hash) {
                    const register_data = await RegisterCheckCluster0.create({
                        email : emailId ,
                        session_token : token ,
                        password : hash , 
                        date:datetime_current,
                        time_stamp : time ,
                        verified : false
                    })
                })
                return {
                    info,
                    message: 'Email Sent Successfully'
                }
            } else {
                throw new Error('Mail Not Sent')
            }
        }
        //If mail exists
        else if(mail_register_check && mail_register_check.length !== 0 && mail_register_check[0].verified === false){
            console.log(duration);
            // If greater than duration generate token & update timings
            if ((datetime_current - mail_register_check[0].date)/(1000*60) >= duration){
                // console.log((datetime_current - mail_register_check[0].date)/(1000*60) , duration);
                let { token , verificationLink } = generate_token()

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
                
                if (info.accepted.length > 0){
                    const update_data = await RegisterCheckCluster0.findOneAndUpdate({ email:emailId } , {
                        session_token : token ,
                        date:datetime_current,
                        time_stamp : time ,
                    })  //Returns the data pre-update
                                                                                                        
                    return {
                        info,
                        message: 'Email Sent Successfully'
                    }
                } else {
                    throw new Error('Mail Not Sent')
                }

            } else {
                //Just send mail donot generate token again
                const info = await nodemailerTransporter.sendMail({
                    from: process.env.ADMIN_MAIL,
                    to:emailId,
                    subject:'Email Verification',
                    template: 'emailVerifications',
                    context:{
                        logoUrl : process.env.LOGO_URL,
                        verificationLink: process.env.VERIFY_END_POINT_URL+"?key="+mail_register_check[0].session_token ,
                    }
                });

                if(info.accepted.length > 0){
                    return {
                        info,
                        message: 'Email Sent Successfully'
                    }
                } else {
                    throw new Error('Mail Not Sent')
                }

            }
        } else if(mail_register_check && mail_register_check.length !== 0 && mail_register_check[0].verified === true){
            return {
                message: "Email Already Registered"
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

const generate_token = () => {
    const current_date = (new Date()).valueOf().toString();
    let random = Math.random().toString();
            
    let token = crypto.createHash('MD5').update(current_date + random).digest('hex') 

    let verificationLink = process.env.VERIFY_END_POINT_URL+"?key="+token;

    return { token , verificationLink }
}

module.exports = { sendVerificationEmail }
