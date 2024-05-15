import { cancelOrder, getListOrderByUser, orderProduct } from '@controller';
import express from 'express';

export const orderRouter = express.Router();

orderRouter.get('/getListOrderByUser', getListOrderByUser);
orderRouter.post('/orderProduct', orderProduct);
orderRouter.post('/cancelOrder', cancelOrder);
