import express from 'express';
import { hanldeLogout } from '../controllers/logoutController.js';

const router = express.Router();

router.get('/', hanldeLogout);

export default router;
