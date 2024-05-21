import express from 'express';
import { userRouter } from './user';
import { templateRouter } from './template';
import { logRouter } from './log';
import { categoryRouter } from './category';
import { productRouter } from './product';
import { permissionRouter } from './permission';
import { promotionRouter } from './promotion';
import { authMiddleware } from '@middleware';
import { newsRouter } from './news';
import { cartRouter } from './cart';
import { transactionRouter } from './transaction';
import { orderRouter } from './order';

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use('/users', userRouter);
adminRouter.use('/templates', templateRouter);
adminRouter.use('/logs', logRouter);
adminRouter.use('/category', categoryRouter);
adminRouter.use('/products', productRouter);
adminRouter.use('/permissions', permissionRouter);
adminRouter.use('/promotions', promotionRouter);
adminRouter.use('/news', newsRouter);
adminRouter.use('/carts', cartRouter);
adminRouter.use('/orders', orderRouter);
adminRouter.use('/transactions', transactionRouter);
