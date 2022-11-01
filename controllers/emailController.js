import {sendMail} from '../email/index.js';
import nodemailer from 'nodemailer';

export const handleSend = async function(req,res){


  // send mail with defined transport object
  try{
    let details = {
      to:"amirabbasraan@gmail.com",
      subject:"Testing New",
      content:"<h1>Is Heading</h1><p>Is detail description.</p>"
    }
    let info = await sendMail(details);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account

    res.status(200).json({"id":info.messageId,"info":nodemailer.getTestMessageUrl(info)});
} catch( err ){
  console.log("ERROR:",err)
  res.send('bad');
}
}