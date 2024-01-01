const nodemailer = require('nodemailer')
const crypto = require('node:crypto')
const hbs = require('nodemailer-express-handlebars');
const bcrypt = require('bcryptjs')

const RegisterCheckCluster0 = require('../models/register_verify');
const { log } = require('node:console');

//check if email already exists in db or is within the time range of prev token
async function sendVerificationEmail(emailId , password , duration){
    try{
        // console.log("hello");
        const saltRounds = 10
        const datetime_current = new Date();
        // const time = `${d.getHours()}:${d.getMinutes()}`
        const time = datetime_current.toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"})

        RegisterCheckCluster0.find({
            email:emailId
        }).then(result => {
            if(result){
                let { date , time_stamp } = result[0]
                
                const datetime_current = new Date()
                // console.log(date.getHours() , date.getMinutes() , time_stamp);
                // console.log(datetime_current.getHours() , datetime_current.getMinutes());
                // console.log((datetime_current - date)/(1000*60));
                // const datetime_current = new Date().toLocaleDateString();
                const current_time =  new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
                if(datetime_current === date){
                    console.log("same dates");
                    console.log(current_time , time_stamp);
                    let diff = current_time.split(':').map((item , index) => item - time_stamp.split(':')[index] )
                    // console.log(diff);
                }
                // console.log(d2 , date2 , time_stamp   , current_time);
            }
        })

        // let mail_register_check = await RegisterCheckCluster0.find({
        //     email: emailId,
        //     verified:true
        // })
        let mail_register_check = []
        // console.log(mail_register_check);
        
        //Checking if mail is already registered or not
        if (mail_register_check.length === 0){
            
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
            
            // Need to put proper checks that db entry is successful and mail is also sendt , a scenario where 1 happens and other fails is to be prevented
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
                // bcrypt.hash(password , saltRounds , async function(err , hash) {
                //     const register_data = await RegisterCheckCluster0.create({
                //         email : emailId ,
                //         session_token : token ,
                //         password : hash , 
                //         date:datetime_current,
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