import { cancelOrder, checkPromotion, getListOrderByUser, orderProduct } from '@controller';
import { authMiddleware } from '@middleware';
import express from 'express';

export const orderRouter = express.Router();

orderRouter.use(authMiddleware)
orderRouter.get('/getListOrderByUser', getListOrderByUser);
orderRouter.post('/orderProduct', orderProduct);
orderRouter.post('/cancelOrder', cancelOrder);
orderRouter.post('/checkPromotion', checkPromotion);
