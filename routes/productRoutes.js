import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    res.send('products');
})


export default productRouter