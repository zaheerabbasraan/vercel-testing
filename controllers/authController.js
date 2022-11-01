import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models/index.js';
import { sendMail } from '../email/index.js';

const Setting = db.Setting;
const User = db.User;

dotenv.config();

export const getProfile = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  
  if(!authHeader?.startsWith('Bearer ')) return res.status(401).json({status:false,message:"Invalid token"});
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err,  decoded) => {
      if(err) return res.status(401).json({status:false,message:"Invalid token"}); //Invalid token
      return res.status(200).json({user:decoded.UserInfo});
    }
  )
}

export const handleForgotPassword = async (req,res) => {
  const {email} = req.body;
  if(!email){
    return res.status(401).json({status:false,message:"Email is required"});
  }
  const foundUser = await User.findOne({
    where: {
      email
    }
  })
  if(!foundUser){
    return res.status(401).json({status:false,message:"Account not exist!"});
  }
  const token = jwt.sign({
    id: foundUser.id,
    email: foundUser.email
  },process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'});

  try {
    let data = {
      to: foundUser.email,
      subject: "Reset Password | Snow Fun",
      content: `<p>Please follow the link to reset your password.<br>http://localhost:3000/admin/session/reset-password/${token}</p>`
    }
    await sendMail(data);
    return res.status(200).json({status:true,message:"An email has been sent to your mail account. Please visit the mail and reset your password!"});
  } catch (error) {
    return res.status(401).json({status:false,message:"There was an error while sending you reset email."});
  }
}

export const handleResetPassword = async (req,res) => {
  const {password,confirmPassword,token} = req.body;

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,async (err,decoded)=>{
    if(err) return res.status(403).json({message:"Reset link is invalid or expired."});
    let email = decoded.email;
    let hashedPwd = await bcrypt.hash(password,10)
    await User.update({
      password: hashedPwd
    },{
      where:{
        email
      }
    })
    return res.status(200).json({message:"Password has been reset successfully."});
  })
}

export const handleLogin = async (req,res) => {
  const {email,pwd} = req.body;
  if(!email || !pwd){
    return res.status(401).json({status:false,message:"Email and passord are required"});
  }
  const foundUser = await User.findOne({
    where: {
      email
    },
    include: Setting
  })
  if(!foundUser){
    return res.status(401).json({status:false,message:"Invalid Email"});
  };
  var settingsObj = await foundUser.getSetting();
  let {id,userId,updatedAt,createdAt,...settings} = settingsObj.dataValues;
  settings = {...settings, currency: JSON.parse(settings.currency)};

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if(match){
    const roles = Object.values(JSON.parse(foundUser.roles));
    // create JWTs
    const accessToken = jwt.sign(
      { 
        "UserInfo":{
          "email": foundUser.email,
          "roles": roles,
          "settings": settings
        } 
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '30m'}
    );
    const refreshToken = jwt.sign(
      { "email": foundUser.email,"roles":roles,"settings":settings },
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: '1d'}
    );
    await User.update({
      refreshToken
    },{
      where:{email:foundUser.email}
    });
    res.cookie('jwt', refreshToken, {httpOnly: true,secure:true, sameSite:'none', maxAge: 24 * 60 * 60 * 1000});
    return res.status(200).json({status:true,accessToken,user:{
      email: foundUser.email,
      roles: foundUser.roles,
      settings: settings
    }});;
  }else{
    return res.status(401).json({status:false,message:"Incorrect Password."});;
  }
}