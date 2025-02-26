require('dotenv').config()

const env = process.env.NODE_ENV || 'dev'

const conf = {
    dev : {
        PORT : process.env.PORT || 3000,
        BASE_URL : process.env.BASE_URL,
        FRONTEND_BASEURL : process.env.FRONTEND_BASEURL,
        VERIFY_ENDPOINT_URL : () => process.env.VERIFY_ENDPOINT_URL.replace("${BASE_URL}" , conf[env].BASE_URL).replace("${PORT}" , conf[env].PORT) ,
        emailSender : {
            TOKEN:process.env.TOKEN,
            VERIFICATION_TOKEN_DURATION:process.env.VERIFICATION_TOKEN_DURATION
        },
        db : {
            // MONGO_PASSWORD : process.env.MONGO_PASSWORD,
            MONGO_CONNECT_STRING : process.env.MONGO_CONNECT_STRING
        },
        jwt : {
            SECRETKEY : process.env.SECRETKEY,
            JWT_DURATION : process.env.JWT_DURATION 
        },
        cookies : {
            HTTP_ONLY : process.env.HTTP_ONLY,
            SECURE : process.env.SECURE,
            SAME_SITE : process.env.SAME_SITE,
            DOMAIN : process.env.DOMAIN
        }
    },
    production:{}
}
// console.log(conf[env].BASE_URL , conf[env].PORT , conf[env].VERIFY_ENDPOINT_URL() , "config")
module.exports = conf[env]
