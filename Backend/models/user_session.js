const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')

//To check logged in user and keep logs of when the user logs in and out
const user_session_schema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        validate:[isEmail , "Please Enter Valid Email"],
    },
    password:{
        type:String,
        required:[true , "Please enter an Password"], 
        minlength:[6 , 'Min Length of password is six characters']
    },
    logInTime:Date,
    logOutTime:Date
    
})

user_session_schema.pre('save' , async function() {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password , salt)
})

module.exports = mongoose.model('LogIn/LogOut' , user_session_schema)