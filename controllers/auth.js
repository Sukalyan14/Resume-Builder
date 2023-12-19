const fs = require('fs')
const send_mail = require('../middleware/sendVerificationMail')

const register = async (req , res) => {
    
    send_mail.sendVerificationEmail(req.body.email , req.body.password)
    .then(result => {
            // console.log(result);
            if (result.error){
                // need to use return for all the res.status..json statements because register is technically not a route attached function but independent of itself
                return res.status(500).json({
                    status: 'Failed',
                    message: result.message
                })
            }

            return res.status(201).json({
                status: 'Success',
                message: result.message
            })
            
        })
    .catch(err => {
        return res.status(500).json({
            status: 'Failed',
            message: 'Server Error'
        })
    })
    
}

const verifyEmail = async (req , res) => {
    
    const token = req.query.key
    
    console.log(token);

    if(token){
        res.writeHead(200 , {'Content-Type': 'text/html'})
        // fs.readFile()
    }
    res.status(201).json({ token })
}

module.exports = { register , verifyEmail }
