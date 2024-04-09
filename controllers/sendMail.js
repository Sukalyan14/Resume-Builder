const nodemailer = require("nodemailer")
const hbs = require('nodemailer-express-handlebars');

//smtp config details
const config = {
    // logger:true,
    debug:true,
    service : process.env.MAIL_SERVICE_NAME,
    port: process.env.MAIL_SERVICE_PORT, // or the appropriate port for your SMTP server
    secure: process.env.MAIL_SERVICE_SECURE, // true for 465, false for other ports
    auth:{
        user :process.env.MAIL_USER_NAME,
        pass :process.env.MAIL_USER_PASSWORD
    }
}

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


let nodemailerTransporter = nodemailer.createTransport(config)

nodemailerTransporter.use('compile' , hbs(options))

const sendMail = async (from , to , subject , template , context) => {
    try{
        const info = await nodemailerTransporter.sendMail({
            from,
            to,
            subject,
            template,
            context,
        });

        console.log(info , "line 46 sendmail");
        return info
    }
    catch(error){
        // console.log("There is an error in sending mail , line 43 sendMail" + error);
        throw error
    }
    

    // nodemailerTransporter.sendMail({ from , to , subject , template , context } , function(error , info) {
    //     if(error){
    //         console.log("There is an error in sending mail , line 43 sendMail" + error.message);
    //         return error
    //         // throw 
    //     } else {
    //         console.log(info + "Line 46 sendmail");
    //         return info
    //     }
    // })

    // if (info.accepted.length > 0) {
    //     return info;
    // } else {
    //     throw new Error('Mail Not Sent');
    // }
}

module.exports = sendMail