import db from '../models/index.js';
import { convertCurrency } from '../utils.js';

const Currency = db.Currency;
const User = db.User;

export const handleAddCurrency = async function(req,res){
  const {code,symbol,exchangeRate,auto} = req.body;
  if(!code || !symbol || !exchangeRate){
    return res.status(424).json({message:"Error! Missing values."});
  }
  try {
    await Currency.create({
      code,
      symbol,
      exchange_rate:exchangeRate,
      auto
    })
    let currencies = await Currency.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    return res.status(200).json({message:"Added! "+code+" added successfully.",currencies});
  } catch (error) {
    return res.status(424).json({message:"Error! "+error});
  }
}

export const handleUpdateCurrency = async function(req,res){
  const {id,code,symbol,exchangeRate,auto} = req.body;
  if(!code || !symbol || !exchangeRate){
    return res.status(424).json({message:"Error! Missing values."});
  }
  try {
    await Currency.update({
      code,
      symbol,
      exchange_rate:exchangeRate,
      auto
    },{
      where:{
        id
      }
    })
    let currencies = await Currency.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    return res.status(200).json({message:"Updated! "+code+" updated successfully.",currencies});
  } catch (error) {
    return res.status(424).json({message:"Error! "+error});
  }
}

export const handleGetCurrencies = async function(req,res){
  try {
    const currencies = await Currency.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    return res.status(200).json({currencies});
  } catch (error) {
    return res.status(424).json({message:"Error! "+error});
  }
}

export const hanldeRemoveCurrency = async function (req,res){
  const {id} = req.body;
  try{
    await Currency.destroy({
      where:{
        id
      }
    })
    const currencies = await Currency.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    return res.status(200).json({currencies});
  }catch (error) {
    return res.status(424).json({message:"Error! "+error});
  }
}