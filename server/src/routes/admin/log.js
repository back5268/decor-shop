import { getListLog } from '@controller';
import { authMiddleware } from '@middleware';
import express from 'express';

export const logRouter = express.Router();

logRouter.use(authMiddleware);
logRouter.get('/getListLog', getListLog);
