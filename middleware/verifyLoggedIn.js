import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyLoggedIn = (req,res,next) => {
  const cookies = req.cookies;
  var token = null;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if(cookies?._token) token = cookies._token;
  
  if(authHeader?.startsWith('Bearer ')) token = authHeader.split(' ')[1];
  if(token){
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err,  decoded) => {
        if(err) next(); //Invalid token
        return res.redirect('/admin');
      }
    )
  }else{
    next();
  }
}