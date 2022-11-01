import db from '../models/index.js';

const User = db.User;

export const hanldeLogout = async (req,res) => {
  const cookies = req.cookies;
  if(!cookies?.jwt) return res.sendStatus(204); //No Content
  const refreshToken = cookies.jwt;

  //Is refreshToken in db?
  const founduser = await User.findOne({
    where:{
      refreshToken
    }
  });

  if(!founduser) {
    res.clearCookie('jwt', {httpOnly: true, sameSite:'none', secure: true,});
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  await User.update({
    refershToken: ''
  },{
    where:{refreshToken:founduser.refreshToken}
  });

  res.clearCookie('jwt', {httpOnly:true});
  res.sendStatus(204);
}