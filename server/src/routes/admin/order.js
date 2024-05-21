import { getListOrder } from '@controller';
import express from 'express';

export const orderRouter = express.Router();

orderRouter.get('/getListOrder', getListOrder);
