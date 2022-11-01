import bcrypt from 'bcrypt';
import db from '../models/index.js';

const User = db.User;
const Setting = db.Setting;

export const handleRegister = async function(req,res){
  const {email, pwd, roles} = req.body;
  if(!email || !pwd) return res.status(400).json({'message':"Username and passord are required"});
  const duplicate = await User.findOne({where:{email}});
  if(duplicate) return res.status(409).json({"error":"Already exist"});
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd,10);
    //Store the new user
    const createdUser = await User.create({
      'email': email,
      'password': hashedPwd,
      'roles': JSON.stringify(roles)
    });
    Setting.create({
      'userId': createdUser.id,
      'currency': 'USD'
    });
    res.status(201).json({"success":`New user ${email} created`});
  } catch (error) {
    res.status(500).json({"message":error.message});
  }
}