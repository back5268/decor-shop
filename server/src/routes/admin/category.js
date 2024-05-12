import { addCategory, deleteCategory, detailCategory, getListCategory, updateCategory } from '@controller';
import { userMiddleware } from '@middleware';
import express from 'express';

export const categoryRouter = express.Router();

categoryRouter.use(userMiddleware);
categoryRouter.get('/getListCategory', getListCategory);
categoryRouter.get('/detailCategory', detailCategory);
categoryRouter.delete('/deleteCategory', deleteCategory);
categoryRouter.post('/addCategory', addCategory);
categoryRouter.post('/updateCategory', updateCategory);
