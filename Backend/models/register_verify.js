const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')
const sendMail = require('../utils/sendMail')
const conf = require('../config/config')

const register_verify_schema = new mongoose.Schema({
    email:{
        type:String,
        // required:[true , "Please enter an email"], not neccessary here , already have a check for such at the front end
        unique:true,  //All mails uniques
        validate:[isEmail , 'Please Enter Valid Email']
    },
    password:{
        type:String,
        // required:[true , "Please enter an email"], not neccessary here , already have a check for such at the front end
        minlength:[6 , 'Min Length of password is six characters']
    },
    date:{
        type:Date,
        default:Date.now
    },
    // time_stamp:String , 
    verified:{
        type:Boolean,
        default:false
    },
    session_token:String  //Need to handle its generation & regen from the controllers
})

//Encrypting Password
register_verify_schema.pre('save' , async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password , salt)

    next()
})

//Encrypt Password only for change
register_verify_schema.pre('updateOne' , async function(next){
    
    const update = this.getUpdate()
    if(update.$set && update.$set.password){
        try{
           const currentDoc = await this.model.findOne(this.getFilter())
           console.log(currentDoc , update.$set.password)

           if(currentDoc){
                const passwordCheck = await bcrypt.compare(update.$set.password , currentDoc.password)

                if(passwordCheck){
                    delete update.$set.password
                    return next()
                }

                const salt = await bcrypt.genSalt()
                update.$set.password = await bcrypt.hash(update.$set.password , salt)

                next()
           }
        } catch(err){
            return next(err)
        }
    } else {
        return next()
    }
})

//Fire a Mail before record has been saved to db
register_verify_schema.pre('save' , async function() {
    
    if(this.isNew){
        
        let verificationLink = conf.VERIFY_ENDPOINT_URL()+"?key="+this.session_token;
        
        //Template Constants
        const emailSubject = "Email Verification"
        const emailTemplate = 'emailVerifications'
        const logoUrl = conf.oAuthMail.LOGO_URL
        // const emailTemplatePath = path.join(__dirname, 'emailTemplates', `${emailTemplate}.handlebars`);
        
        try{
            const mailResult = await sendMail(conf.oAuthMail.USER_NAME , this.email , emailSubject , emailTemplate , { logoUrl , verificationLink })

            //need more testing to setup error handling for mailResult
            // console.log(mailResult , "register_verify , line 60");
        }
        catch(error){
            // console.log("hello error");
            console.log(error , "line 65 userschema")
            // throw error
            return error
        }
    }
    
})

module.exports = mongoose.model('Registration' , register_verify_schema)  
