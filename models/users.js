const mongoose = require('mongoose');
const istTime=(5.5*60*60*1000);

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,'please fill the field']
    },
    password:{
        type:String,
        required:[true,'please fill the field']
    },
    joinedOn:{
        type:Date,
        default:Date.now()+istTime
    },
    forgetPassword:{
        time:Date,
        otp:String
    },
    token:{
        type:String,
        required:[true,'please enter the token']
    }
}) 

const User = mongoose.model('User',userSchema);

module.exports = User;