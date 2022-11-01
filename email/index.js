import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

const smtpConfig = {
  pool: true,
  host: process.env.MAIL_HOST,
  port: 26,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER, // generated ethereal user
    pass: process.env.MAIL_PASS, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false
  },
  ignoreTLS: true
};

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(smtpConfig);

export const sendMail = async function(details){
  let info = await transporter.sendMail({
    from: process.env.MAIL_USER, // sender address
    to: details.to, // list of receivers
    subject: details.subject, // Subject line
    html: details.content, // html body
  });

  return info;
}