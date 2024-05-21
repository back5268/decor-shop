import { getListCart } from '@controller';
import express from 'express';

export const cartRouter = express.Router();

cartRouter.get('/getListCart', getListCart);
