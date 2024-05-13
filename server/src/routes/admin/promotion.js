import { addPromotion, deletePromotion, detailPromotion, getListPromotion, updatePromotion } from '@controller';
import { authMiddleware } from '@middleware';
import express from 'express';

export const promotionRouter = express.Router();

promotionRouter.use(authMiddleware);
promotionRouter.get('/getListPromotion', getListPromotion);
promotionRouter.get('/detailPromotion', detailPromotion);
promotionRouter.post('/deletePromotion', deletePromotion);
promotionRouter.post('/addPromotion', addPromotion);
promotionRouter.post('/updatePromotion', updatePromotion);
