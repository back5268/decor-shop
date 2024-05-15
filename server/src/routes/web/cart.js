import { addToCart, deleteCart, getListCartByUser } from '@controller';
import express from 'express';

export const cartRouter = express.Router();

cartRouter.get('/getListCartByUser', getListCartByUser);
cartRouter.post('/addToCart', addToCart);
cartRouter.post('/deleteCart', deleteCart);
