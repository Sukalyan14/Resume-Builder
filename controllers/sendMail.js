const nodemailer = require("nodemailer")
const hbs = require('nodemailer-express-handlebars');

//smtp config details
const config = {
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
    const info = await nodemailerTransporter.sendMail({
        from,
        to,
        subject,
        template,
        context,
    });

    if (info.accepted.length > 0) {
        return info;
    } else {
        throw new Error('Mail Not Sent');
    }
}

module.exports = sendMail