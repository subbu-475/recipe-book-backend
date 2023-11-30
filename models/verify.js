const mongoose = require('mongoose');

const verifyUserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please fill the field']
    },
    email:{
        type:String,
        required:[true,'please fill the field']
    },
    password:{
        type:String,
        required:[true,'please fill the field']
    },
    token:{
        type:String,
        required:true
    }
});

const VerifyUser=mongoose.model("verifyUser",verifyUserSchema);

module.exports = VerifyUser;