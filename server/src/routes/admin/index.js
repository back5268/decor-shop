import { authMiddleware } from '@middleware';
import express from 'express';
import { userRouter } from './user';
import { templateRouter } from './template';
import { logRouter } from './log';
import { categoryRouter } from './category';
import { productRouter } from './product';
import { permissionRouter } from './permission';
import { promotionRouter } from './promotion';

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use('/users', userRouter);
adminRouter.use('/templates', templateRouter);
adminRouter.use('/logs', logRouter);
adminRouter.use('/category', categoryRouter);
adminRouter.use('/products', productRouter);
adminRouter.use('/permissions', permissionRouter);
adminRouter.use('/promotions', promotionRouter);
