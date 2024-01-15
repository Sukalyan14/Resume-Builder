const crypto = require('node:crypto')

const generate_token = () => {
    const current_date = (new Date()).valueOf().toString();
    let random = Math.random().toString();
            
    let token = crypto.createHash('MD5').update(current_date + random).digest('hex') 

    let verificationLink = process.env.VERIFY_END_POINT_URL+"?key="+token;

    return { token , verificationLink }
}

module.exports = generate_token