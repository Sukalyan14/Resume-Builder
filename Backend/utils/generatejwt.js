const jwt = require("jsonwebtoken")
const conf = require('../config/config')

const generateJWT = (id) => {
    const maxAge = parseInt(conf.jwt.JWT_DURATION , 10)
    const secretkey = conf.jwt.SECRETKEY
    
    return jwt.sign({ id } , secretkey , {
        expiresIn:maxAge
    })
}

const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        if(token){
            const secretKey = process.env.SECRET_KEY
            
            jwt.verify(token , secretKey , (err , decodedToken) => {
                if(err){
                    console.log(err.message , "Error") ;
                    reject({"Status":"Fail" , "Details":"Invalid Token"})
                } else {
                    // console.log(decodedToken , "Decoded");
                    resolve({"Status":"Success" , "Details":"JWT Token Validated" , data:decodedToken})
                    // next()
                }
            })
        } else {
            reject({"Status":"Fail", "Details":"No Token Provided"});
        }
    })
}

module.exports = { generateJWT , verifyJWT }