const mongoose = require('mongoose')

const register_verify_schema = new mongoose.Schema({
    email:String , 
    // key:String ,
    session_token:String , 
    password:String , 
    date:Date,
    time_stamp:String , 
    verified:Boolean
})

module.exports = mongoose.model('Registration' , register_verify_schema)