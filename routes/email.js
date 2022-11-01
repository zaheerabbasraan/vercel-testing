import express from 'express';
import {handleSend} from '../controllers/emailController.js';
var router = express.Router();

/* GET home page. */
router.get('/send', handleSend);

export default router;