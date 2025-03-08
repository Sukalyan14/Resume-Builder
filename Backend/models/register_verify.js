const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')
const sendMail  = require('../mailerSend/sendMail')
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
    console.log(this.password.length)
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password , salt)
    console.log(this.password.length)
    next()
})

//Encrypt Password only for change
register_verify_schema.pre('updateOne' , async function(next){
    
    //Send email when updating token
    const update = this.getUpdate().$set
    const emailFromFilter = this.getFilter().email

    if(update.session_token && update.date && emailFromFilter){
    
        const verificationLink = `${conf.VERIFY_ENDPOINT_URL()}?key=${update.session_token}`
        await sendMail(emailFromFilter , verificationLink)
    }

    next()

    
    //Only for forget password
    // if(update.$set && update.$set.password){
    //     try{
    //        const currentDoc = await this.model.findOne(this.getFilter())
    //        console.log(currentDoc , update.$set.password)

    //        if(currentDoc){
    //             const passwordCheck = await bcrypt.compare(update.$set.password , currentDoc.password)

    //             if(passwordCheck){
    //                 delete update.$set.password
    //                 return next()
    //             }

    //             const salt = await bcrypt.genSalt()
    //             update.$set.password = await bcrypt.hash(update.$set.password , salt)

    //             next()
    //        }
    //     } catch(err){
    //         return next(err)
    //     }
    // } else {
    //     return next()
    // }
})

//Fire a Mail before record has been saved to db
register_verify_schema.pre('save' , async function() {
    
    if(this.isNew){
        
        let verificationLink = conf.VERIFY_ENDPOINT_URL()+"?key="+this.session_token;
        
        try{
            // await sendMail(this.email , verificationLink)

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
