const nodemail = require('nodemailer');


const sendEmail =(to,user,id)=>{
    const transporter = nodemail.createTransport({
      service:'gmail',
      auth:{
          user:'codedev90@gmail.com',
          pass: process.env.PASS_EMAIL
       }
   });

    const mailOptions={
      from:'codedev90@gmail.com',
      to:to,
      subject:'sending email using nodemailer in node js',
      text:'hii',
      html:`<h1>Simple CRUDS operation</h1>
            <p>Hi ${user} !</p>
            <p>Thank you for registering for CURDS Operation !!!</p>
            <p>Your Candidate ID is ${id}</p>
            <p>Thank you</p>
         `
   };

  transporter.sendMail(mailOptions,function(err,info){
     if(err) return err;
      return info
  })
}
module.exports = sendEmail;