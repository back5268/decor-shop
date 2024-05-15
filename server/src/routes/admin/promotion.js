import { addPromotion, deletePromotion, detailPromotion, getListPromotion, updatePromotion } from '@controller';
import express from 'express';

export const promotionRouter = express.Router();

promotionRouter.get('/getListPromotion', getListPromotion);
promotionRouter.get('/detailPromotion', detailPromotion);
promotionRouter.post('/deletePromotion', deletePromotion);
promotionRouter.post('/addPromotion', addPromotion);
promotionRouter.post('/updatePromotion', updatePromotion);
