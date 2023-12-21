const fs = require('fs')
const send_mail = require('../middleware/sendVerificationMail')
const RegisterCheckCluster0 = require('../models/register_verify')
// const express = require('express')

const duration = 20

const register = async (req , res) => {
    
    send_mail.sendVerificationEmail(req.body.email , req.body.password)
    .then(result => {
            // console.log(result , "result");
            if (result && result.error){
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
        console.log(err);
        return res.status(500).json({
            status: 'Failed',
            message: 'Server Error'
        })
    })
}

const verifyEmail = async (req , res) => {
    
    const token = req.query.key
    
    //Check if email is already validated or not here
    let token_check_result = await RegisterCheckCluster0.find({
        session_token: token,
    })

    // console.log(token_check_result);

    if(token){
        res.writeHead(200 , {'Content-Type': 'text/html'})
        fs.readFile('./emailTemplates/success.html' , null , (error , data) => {
            if(error){
                res.write("Congratulations! Your email address was successfully verified. You can now login to your account.")
            } else {
                res.write(data)
            }
            res.end();
        })
    }
    else {
        res.writeHead(404 , {'Content-Type': 'text/html'})
        fs.readFile('./emailTemplates/success.html' , null , (error , data) => {
            if(error){
                res.write("Oops , link might be invalid")
            } else {
                res.write(data)
            }
            res.end()
        })
    }
}

module.exports = { register , verifyEmail }
