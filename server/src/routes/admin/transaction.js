import { getListTransaction } from '@controller';
import express from 'express';

export const transactionRouter = express.Router();

transactionRouter.get('/getListTransaction', getListTransaction);
