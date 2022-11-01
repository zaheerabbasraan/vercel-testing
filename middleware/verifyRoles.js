export const verifyRoles = (...allowedRoles) => {
  return (req,res,next) => {
    console.log("roles",req.roles);
    if(!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    //Roles in req are set in verifyJWT
    const result = req.roles.map(role=>rolesArray.includes(role)).find(val => val === true);
    console.log("Result",result);
    if(!result) return res.sendStatus(401);
    next();
  }
}