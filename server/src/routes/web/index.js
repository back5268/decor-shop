import express from 'express';
import { cartRouter } from './cart';
import { productRouter } from './product';
import { orderRouter } from './order';

export const webRouter = express.Router();

webRouter.use('/carts', cartRouter);
webRouter.use('/orders', orderRouter);
webRouter.use('/products', productRouter);