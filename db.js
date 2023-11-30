const mongoose = require('mongoose');
const dotenv=require('dotenv');

dotenv.config();

const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.connection_string);
        console.log("data base connected successfully");
    }
    catch(err){
        console.log(err);
    }
    
}

module.exports = connectDB;