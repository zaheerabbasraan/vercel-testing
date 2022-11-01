import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req,res,next){
  res.render("admin/dashboard");
});

export default router;