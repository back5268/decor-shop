import express from 'express';
import { cartRouter } from './cart';
import { productRouter } from './product';
import { orderRouter } from './order';
import { newsRouter } from './news';

export const webRouter = express.Router();

webRouter.use('/carts', cartRouter);
webRouter.use('/orders', orderRouter);
webRouter.use('/products', productRouter);
webRouter.use('/news', newsRouter);