import  express from 'express';
import { handleAddCurrency,handleGetCurrencies, handleUpdateCurrency, hanldeRemoveCurrency } from '../controllers/CurrencyController.js';
const router = express.Router();


router.route('/currency').post(handleAddCurrency).get(handleGetCurrencies).delete(hanldeRemoveCurrency).put(handleUpdateCurrency);

export default router;