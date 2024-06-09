import { completeOrder, confirmOrder, exportOrder, getListOrder, importOrder } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const orderRouter = express.Router();

orderRouter.get('/getListOrder', getListOrder);
orderRouter.post('/confirmOrder', confirmOrder);
orderRouter.post('/completeOrder', completeOrder);
orderRouter.post('/importOrder', upload.single('file'), importOrder);
orderRouter.get('/exportOrder', exportOrder);