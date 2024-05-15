import { addCategory, deleteCategory, detailCategory, getListCategory, updateCategory } from '@controller';
import express from 'express';

export const categoryRouter = express.Router();

categoryRouter.get('/getListCategory', getListCategory);
categoryRouter.get('/detailCategory', detailCategory);
categoryRouter.post('/deleteCategory', deleteCategory);
categoryRouter.post('/addCategory', addCategory);
categoryRouter.post('/updateCategory', updateCategory);
