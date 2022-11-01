import jwt from 'jsonwebtoken';
import CC from 'currency-converter-lt';

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email:  user.email,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
};

export const isAuth = (req,res,next) => {
    const authorization = req.headers.authorization;

    if(authorization){
        const token = authorization.slice(7, authorization.length); //Bearer xxxxx
        jwt.verify(token, process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                res.status(401).send({message: 'Invalid Token'});
            }else{
                req.user = decode;
                next();
            }
        })
    }else{
        res.status(401).send({message: 'No Token'});
    }
}

export const convertCurrency = async (amount,from,to) => {
    if(amount <= 0) return 0;
    if(from === to) return amount;
    let currencyConverter = new CC({from, to, amount});
    let response = await currencyConverter.convert();
    return response;
}

export const changePrices = async (obj,to) => {
    const items = await Promise.all(
        obj.map(async(item)=>{
            let p = await convertCurrency(parseFloat(item.price),'usd',to);
            return {...item.dataValues,price:p};
        })
    )
    return items
}