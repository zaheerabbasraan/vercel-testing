import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyJWT = (req,res,next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if(!authHeader?.startsWith('Bearer ')) return res.status(403).json({message:"Invalid login"}); 
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err,  decoded) => {
      if(err) return res.status(403).json({message:"Invalid login"}); //Invalid token
      req.email = decoded.UserInfo.email;
      req.roles = decoded.UserInfo.roles;
      req.settings = decoded.UserInfo.settings;
      next();
    }
  )
}