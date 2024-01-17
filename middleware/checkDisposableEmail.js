const disposableEmails = require("../domains_mx.json")

const checkDisposableEmail = (req , res , next) => {
    const domain = req.body.email.split("@")[1]
    if (!disposableEmails.includes(domain)){
        next()
    } else {
        return res.status(409).json({
            message: 'Please Use Valid Mails'
        })
    }
    
}

module.exports = {checkDisposableEmail}