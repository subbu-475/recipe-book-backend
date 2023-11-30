const express = require('express');
const app = express();
const route = express.Router();
const {CheckValidUser} = require('../controller/logincontroller');

route.route('/').post(async(req,res)=>{
    try{
        const {email,password}=req.body;
        const validUser = await CheckValidUser(email,password);
        if (validUser==="invalid username or password"){
            res.status(200).send("invalid username or password")
        }
        else if (validUser==="server busy"){
            res.status(200).send("server busy")
        }
        else{
            res.status(200).json({
            token:validUser.token,
            status:true
            })
        }
    }
    catch (err){

    }
})

module.exports = route;