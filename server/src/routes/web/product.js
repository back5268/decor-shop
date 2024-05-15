import { detailProduct, getListProductApp } from '@controller';
import express from 'express';

export const productRouter = express.Router();

productRouter.get('/getListProduct', getListProductApp);
productRouter.get('/detailProduct', detailProduct);
