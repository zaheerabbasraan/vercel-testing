import  express from 'express';
import { handleGetAssets } from '../controllers/ApiController.js';
const router = express.Router();


router.route('/assets').get(handleGetAssets);

export default router;