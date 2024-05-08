import { getListLog } from '@controller';
import { userMiddleware } from '@middleware';
import express from 'express';

export const logRouter = express.Router();

logRouter.use(userMiddleware);
logRouter.get('/getListLog', getListLog);
