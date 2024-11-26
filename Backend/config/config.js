require('dotenv').config()

const env = process.env.NODE_ENV || 'dev'

const conf = {
    dev : {
        PORT : process.env.PORT || 3000,
        BASE_URL : process.env.BASE_URL,
        VERIFY_ENDPOINT_URL : function() {return process.env.VERIFY_ENDPOINT_URL.replace("${BASE_URL}" , this.BASE_URL).replace("${PORT}" , this.PORT)} ,
        oAuthMail : {
            SERVICE : process.env.MAIL_SERVICE,
            SERVICE_SECURE : process.env.MAIL_SERVICE_SECURE,
            SERVICE_PORT : process.env.MAIL_SERVICE_PORT,
            USER_NAME : process.env.USER_NAME,
            CLIENT_ID : process.env.CLIENT_ID,
            CLIENT_SECRET : process.env.CLIENT_SECRET,
            REFRESH_TOKEN : process.env.REFRESH_TOKEN,
            REDIRECT_URI : process.env.REDIRECT_URI,
            LOGO_URL : process.env.LOGO_URL,
            VERIFICATION_TOKEN_DURATION : process.env.VERIFICATION_TOKEN_DURATION,
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

module.exports = conf[env]
// console.log(conf[env].VERIFY_ENDPOINT_URL() , "config")