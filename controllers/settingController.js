import db from '../models/index.js';
import { convertCurrency } from '../utils.js';

const Setting = db.Setting;
const User = db.User;

export const handleSetCurrency = async function(req,res){
  const {currency} = req.body;
  if(!currency){
    return res.status(424).json({message:"Error! Invalid value."});
  }
  const foundUser = await User.findOne({
    where:{
      email: req.email
    }
  })
  console.log(foundUser)
  if(!foundUser) return res.status(424).json({message:"Error! Unotherized."});
  try {
    await Setting.update({
      currency
    },{
      where:{userId:foundUser.id}
    });
    return res.status(200).json({message:"Updated! Default currency updated to "+currency.code+"."});
  } catch (error) {
    return res.status(424).json({message:"Error! "+error});
  }
}

export const handleGetCurrency = async function(req,res){
  const foundUser = await User.findOne({
    where:{
      email: req.email
    }
  })
  if(!foundUser) return res.status(424).json({message:"Error! Unotherized."});
  try {
    const settings = await Setting.findOne({
      where:{userId:foundUser.id}
    });
    console.log("Currency>>",typeof settings.currency, settings.currency)
    const valueto = await convertCurrency(30,'usd','pkr');
    console.log("type",typeof valueto,'Data',valueto)
    return res.status(200).json({currency});
  } catch (error) {
    return res.status(424).json({message:"Error! "+error});
  }
}