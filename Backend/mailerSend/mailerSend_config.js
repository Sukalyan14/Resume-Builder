const { MailerSend, Sender } = require('mailersend')

const mailerSendClient = new MailerSend({
    apiKey:process.env.TOKEN
})

const sender = new Sender("sukalyannayak@trial-351ndgwjoqrlzqx8.mlsender.net" , "Resume Builder Verificationa")

module.exports = { mailerSendClient , sender}