const nodemailer = require('nodemailer')
const cryto = require('crypto')
const express_handlebars = require('nodemailer-express-handlebars');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
//will need async await when connected and fetching from db

const dummy = (req, res) => {
    // console.log("hit the  endpoint");
    res.json({ message: "Hello from server!" });
}


async function sendVerificationEmail(emailId){
    try{
        console.log("try");
        let current_date = (new Date()).valueOf().toString();
        let random = Math.random().toString()
        let hashedValue = cryto.createHash('MD5').update(current_date + random).digest("hex")
        let verificationLink = process.env.VERIFY_END_POINT_URL + "?key=" + hashedValue;

        let transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE_NAME,
            auth:{
                user: process.env.MAIL_USER_NAME,
                pass: process.env.MAIL_USER_PASSWORD
            }
        })

       
        console.log(typeof info, "Line 49");
        }    
        catch(error){
            console.log(error, "Line 52");
        }
    // .then((info) => {console.log(info);})
    //   .catch(err => console.log(err))
}


const register = async (req , res) => {

    await sendVerificationEmail(req.body.email)
        .then((info) => {
            console.log(info);
            res.status(201).json(
                {
                    msg:'Email Sent',
                    info: "Verification Email Sent",
                    // preview: nodemailer.getTestMessageUrl(info)
                })
        })
        .catch((err) => {
            console.log('error' , "line 72");
            res.status(500).json( { msg: err } )
        })

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