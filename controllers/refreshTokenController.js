import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models/index.js';

const User = db.User;

dotenv.config();



export const handleRefreshToken = async (req,res) => {
  const cookies = req.cookies;
  if(!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({
    where: {
      refreshToken
  }})
  if(!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      console.log(foundUser.email, decoded.email);
      if(err || foundUser.email !== decoded.email) return res.sendStatus(403);
      const roles = Object.values(JSON.parse(foundUser.roles));
      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "email": decoded.email,
            "roles": roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '5m'}
      );
      res.json({ accessToken })
    }
  )

}