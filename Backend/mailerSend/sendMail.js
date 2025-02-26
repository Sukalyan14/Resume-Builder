const { EmailParams , Recipient, MailerSend } = require('mailersend')
const { mailerSendClient , sender } = require('./mailerSend_config')
const emailVerificationTemplate = require('./emailTemplates/emailVerificationTemplates')

const sendMail = async (email , verificationLink) => {
    try {
        console.log("in Sendmail")
        const recipients = [new Recipient(email)]
        
        const emailParams = new EmailParams()
                                    .setFrom(sender)
                                    .setTo(recipients)
                                    .setSubject("Email Verification")
                                    .setHtml(emailVerificationTemplate.replaceAll("{ verificationLink }" , verificationLink))

        const response = await mailerSendClient.email.send(emailParams)

        if(response.statusCode === 202){
            //All Ok Email Sent
        } else {

        }
        
    } catch (error) {
        console.log(error)
    }   
}

module.exports = sendMail