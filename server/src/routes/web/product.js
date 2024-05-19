import { detailProduct, getListProductReviewWeb, getListProductWeb } from '@controller';
import express from 'express';

export const productRouter = express.Router();

productRouter.get('/getListProduct', getListProductWeb);
productRouter.get('/detailProduct', detailProduct);
productRouter.get('/getListProductReviewWeb', getListProductReviewWeb);
