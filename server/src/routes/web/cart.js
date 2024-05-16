import { addToCart, deleteCart, getListCartByUser } from '@controller';
import { authMiddleware } from '@middleware';
import express from 'express';

export const cartRouter = express.Router();

cartRouter.use(authMiddleware)
cartRouter.get('/getListCartByUser', getListCartByUser);
cartRouter.post('/addToCart', addToCart);
cartRouter.post('/deleteCart', deleteCart);
