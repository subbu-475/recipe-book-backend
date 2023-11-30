const nodeMailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodeMailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.nodemailer_user,
        pass:process.env.nodemailer_password
    }
})

async function sendMail(tomail,subject,content){
    const mailOptions=({
        from:"personalcse475@gmail.com",
        to:tomail,
        subject:subject,
        html:content
    })

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(`error is ${error}`);
        }
        else{
            console.log(`info is ${info.response}`);
        }
    })
}

module.exports= {sendMail};