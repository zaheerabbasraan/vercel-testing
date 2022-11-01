import  express from 'express';
import {handleLogin, getProfile, handleForgotPassword, handleResetPassword} from '../controllers/authController.js';
import {verifyLoggedIn} from '../middleware/verifyLoggedIn.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
const router = express.Router();

router.route('/login').get(verifyLoggedIn,function(req,res){
  res.render('admin/accounts/login');
}).post(handleLogin);

router.route('/profile').get(verifyJWT,getProfile);

router.route('/forgot-password').post(handleForgotPassword);
router.route('/reset-password').post(handleResetPassword);

export default router;