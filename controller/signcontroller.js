const VerifyUser= require('../models/verify');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
const { sendMail } = require('./sendmail');
const User = require('../models/users');
dotenv.config();

const InsertVerifyUser = async(name,email,password)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const token = generateToken(email);

        const userVerify =new VerifyUser({
            name:name,
            email:email,
            password:hashedPassword,
            token:token
        })

        userVerify.save().then(()=>{
            console.log("user saved in the userverify collections");
        })
        const activationLink=`http://localhost:8000/signin/${token}`
        const content = `<h4>Hi,there</h4>
        <p>Plese click the below link to verify</p>
        <a href=${activationLink}>click here</a>
        <p>regard</p>
        <p>team</p>
        `
        sendMail(email,"Verify Account",content);

    }
    catch (err){
        console.log(err);
    }
}

const generateToken=(email)=>{
  const token = jwt.sign(email,process.env.jwt_token)
  return token;
}

const CheckVerifyUser = async(token)=>{
    try{
        const tokenedUser = await VerifyUser.findOne({token:token});
        if(tokenedUser){
            const insertUser = new User({
                name:tokenedUser.name,
                email:tokenedUser.email,
                password:tokenedUser.password,
                token:token,
                forgetPassword:{}
            })
            await insertUser.save().then(()=>{
                console.log(`${tokenedUser.name} inserted successfully`);
            })
            await VerifyUser.deleteOne({token:token});
            const content = `<h4>Registeration successfull</h4>
            <p>Welcome to the app</p>
            <p>Regards</p>
            <p>Team</p>
            `
            sendMail(insertUser.email,'Registeration successfull',content);
            return `<h4>Registeration successfull</h4>
            <h5>welcome to the app</h5>
            <p>You are successfully registered</p>
            <a href=http://localhost:3000/login >Login</a>
            <p>regards</p>
            <p>Team</p>`;
        }
        return `<h4>Registeration failed</h4>
        <p>Token might be expired</p>
        <p>Regards</p>
        <p>Team</p>`;
        
    }
    catch (e){
        console.log(e);
        return `
        <html>
        <body>
        <h4>Registeration failed</h4>
        <p>Token might be expired</p>
        <p>Regards</p>
        <p>Team</p>
        </body>
        </html>
        `
    }
}

module.exports = {InsertVerifyUser,CheckVerifyUser};