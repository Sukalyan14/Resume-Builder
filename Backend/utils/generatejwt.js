const jwt = require("jsonwebtoken")

const geneateJWT = (id) => {
    const maxAge = parseInt(process.env.JWT_DURATION , 10)
    const secretkey = process.env.SECRETKEY
    
    return jwt.sign({ id } , secretkey , {
        expiresIn:maxAge
    })
}

module.exports = geneateJWT