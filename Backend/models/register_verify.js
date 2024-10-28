const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')
const sendMail = require('../controllers/sendMail')

// const register_verify_schema = new mongoose.Schema({
//     email:String , 
//     // key:String ,
//     session_token:String , 
//     password:String , 
//     date:Date,
//     time_stamp:String , 
//     verified:Boolean
// })

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
        minlength:[6 , 'Min Length of password is eigth characters']
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

//Fire a Mail after record has been saved to db
register_verify_schema.post('save' , async function(doc) {
    
    // if(doc.isNew){
        // console.log("mail");
        let verificationLink = process.env.VERIFY_END_POINT_URL+"?key="+this.session_token;
    
        // console.log(verificationLink);
        //Template Constants
        const emailSubject = "Email Verification"
        const emailTemplate = 'emailVerifications'
        const logoUrl = process.env.LOGO_URL
    
        try{
            const mailResult = await sendMail(process.env.ADMIN_MAIL , this.email , emailSubject , emailTemplate , { logoUrl , verificationLink })
            // console.log(mailResult , "register_verify , line 60");
        }
        catch(error){
            // console.log("hello error");
            // console.log(error , "line 65 userschema")
            throw error
        }
    // }
    
})

module.exports = mongoose.model('Registration' , register_verify_schema)  