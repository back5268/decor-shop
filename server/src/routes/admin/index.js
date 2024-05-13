import { authMiddleware } from '@middleware';
import express from 'express';
import { userRouter } from './user';
import { templateRouter } from './template';
import { logRouter } from './log';
import { categoryRouter } from './category';
import { productRouter } from './product';
import { permissionRouter } from './permission';

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use('/user', userRouter);
adminRouter.use('/template', templateRouter);
adminRouter.use('/log', logRouter);
adminRouter.use('/category', categoryRouter);
adminRouter.use('/product', productRouter);
adminRouter.use('/permission', permissionRouter);
