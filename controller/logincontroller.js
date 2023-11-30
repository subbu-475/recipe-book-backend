const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


const checkUser = async (email)=>{
    try {
        const user = await User.findOne({email});
        if(user){
            return true;
        }
        else{
           return false;
    }
    }
    catch (e){
        return 'server busy'
    }
    
}

const CheckValidUser = async(email,password)=>{
    try {
        const userCheck = await User.findOne({email:email});
        const validPassword = await bcrypt.compare(password,userCheck.password);
        if(validPassword){
            const token = jwt.sign({email},process.env.jwtlogin_token);
            const response = {
                id:userCheck._id,
                name:userCheck.name,
                email:userCheck.email,
                token:token,
                status:true
            }

            await User.findOneAndUpdate({email:userCheck.email},{$set:{token:token}},{new:true});
            return response;
        }
        return "invalid username or password";
    }
    catch(err){
        console.log(err);
        return "server busy";
    }
}

module.exports = {checkUser,CheckValidUser};