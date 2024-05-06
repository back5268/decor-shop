import { authMiddleware } from '@middleware';
import express from 'express';
import { userRouter } from './user';

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use('/user', userRouter);
