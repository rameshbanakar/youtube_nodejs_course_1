const nodemailer=require("nodemailer")

const sendMail=(options)=>{
   const transport = nodemailer.createTransport({
     host: process.env.MAIL_HOST,
     port: process.env.MAIL_PORT,
     auth: {
       user: process.env.MAIL_USERNAME,
       pass: process.env.MAIL_PASSWORD,
     },
   });
   const emailOptions = {
     from: "ciniFlex support<support@ciniflex.com>",
     to: options.email,
     subject:options.subject,
     text:options.message
   };
   transport.sendMail(emailOptions);
}
module.exports = sendMail;