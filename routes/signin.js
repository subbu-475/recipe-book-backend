const {checkUser} = require('../controller/logincontroller')
const express = require('express');
const app=express();
const route=express.Router();
const {InsertVerifyUser,CheckVerifyUser}=require('../controller/signcontroller')

route.route('/:token').get(async(req,res)=>{
    try{
        const token = req.params.token;
        const response = await CheckVerifyUser(token);
        console.log(response);
        res.status(200).send(response)
    }
    catch(e){
        console.log(e);
        res.status(500).send(
            `
        <html>
        <body>
        <h4>Registeration failed</h4>
        <p>Token might be expired</p>
        <p>Regards</p>
        <p>Team</p>
        </body>
        </html>
        `
        )
    }
})

route.route('/verify').post(async(req,res)=>{
    const {name,email,password}= await req.body;
    const isUserAvailable = await checkUser(email);
    if(isUserAvailable===true){
        res.status(200).send(false);
    }
    else if(isUserAvailable===false){
        await InsertVerifyUser(name,email,password);
        res.status(200).send("Mail sent successfully")
    }
    else {
        res.status(500).send('server busy');
    }
})

module.exports = route;