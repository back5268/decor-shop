import { completeOrder, confirmOrder, getListOrder } from '@controller';
import express from 'express';

export const orderRouter = express.Router();

orderRouter.get('/getListOrder', getListOrder);
orderRouter.post('/confirmOrder', confirmOrder);
orderRouter.post('/completeOrder', completeOrder);
