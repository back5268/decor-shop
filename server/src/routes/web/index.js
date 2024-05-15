import express from 'express';
import { cartRouter } from './cart';
import { productRouter } from './product';
import { orderRouter } from './order';

export const webRouter = express.Router();

webRouter.use('/card', cartRouter);
webRouter.use('/order', orderRouter);
webRouter.use('/product', productRouter);