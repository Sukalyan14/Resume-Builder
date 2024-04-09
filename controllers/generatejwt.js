const jwt = require("jsonwebtoken")

const maxAge = process.env.JWT_DURATION
const secretkey = process.env.SECRETKEY

const geneateJWT = (id) => {
    return jwt.sign({ id } , secretkey , {
        expiresIn:maxAge
    })
}

module.exports = geneateJWT