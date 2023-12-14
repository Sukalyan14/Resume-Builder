const nodemailer = require('nodemailer')
const crypto = require('crypto')
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
//will need async await when connected and fetching from db

const dummy = (req, res) => {
    // console.log("hit the  endpoint");
    res.json({ message: "Hello from server!" });
}


const register = async (req , res) => {
    // let emailId = req.body.email
    // console.log(emailId);
    
    try{
        await sendVerificationEmail(req.body.email)

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

async function sendVerificationEmail(emailId){
    try{
        let current_date = (new Date()).valueOf().toString();
        let random = Math.random().toString();
        let hashedValue = crypto.createHash('MD5').update(current_date + random).digest('hex');
        let verificationLink = process.env.VERIFY_END_POINT_URL+"?key="+hashedValue;  //Store in db for a specific session

        // console.log(process.env.VERIFY_END_POINT_URL , process.env.LOGO_URL);

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


module.exports = { dummy , register }

//Dump
// transporter.use('compile' , hbs({
//     viewEngine: {
//         extname: '.handlebars',
//         // partialsDir: './emailTemplates',
//         partialsDir: path.resolve(__dirname , "emailVerifications"),
//         // layoutsDir: './emailTemplates/',
//         defaultLayout: 'emailVerifications'
//     },
//     // viewPath: './emailTemplates/',
//     viewPath: path.resolve(__dirname , "emailVerifications"),
//     extName: '.handlebars'
// }))

// let info = await transporter.sendMail({
//     from: 'arthurdesanta39@gmail.com',
//     to: emailId,
//     subject: 'Email Verification',
//     template: 'emailVerifications',
//     context: {
//         logoUrl: process.env.LOGO_URL,
//         verificationLink: verificationLink
//     }
// })

// await sendVerificationEmail(req.body.email)
// .then((info) => {
//     console.log(info);
//     res.status(201).json(
//         {
//             msg:'Email Sent',
//             info: "Verification Email Sent",
//             // preview: nodemailer.getTestMessageUrl(info)
//         })
// })
// .catch((err) => {
//     console.log('error' , "line 72");
//     res.status(500).json( { msg: err } )
// })

    // res.status(201).json(
    //     {
    //         msg:'Email Sent',
    //         info: "Verification Email Sent",
    //         // preview: nodemailer.getTestMessageUrl(info)
    //     })
    // // tewiba1102@soebing.com
    // let message = {
    //     from:'thanatos5614@gmail.com',
    //     to: req.body.email,
    //     subject: 'Welcome To My World',
    //     html:`<b>Hello There</b>`
    // }

    // transporter.sendMail(message)
    //     .then((info) => {
    //         return res.status(201).json(
    //             {
    //                 msg:'Email Sent',
    //                 info: info.messageId,
    //                 preview: nodemailer.getTestMessageUrl(info)
    //             }
    //         )} //for .then
    //     ).catch((error) => {
    //     return res.status(500).json( { msg: error } )
    // })