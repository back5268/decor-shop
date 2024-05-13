import { addTemplate, deleteTemplate, detailTemplate, getListTemplate, updateTemplate } from '@controller';
import { authMiddleware } from '@middleware';
import express from 'express';

export const templateRouter = express.Router();

templateRouter.use(authMiddleware);
templateRouter.get('/getListTemplate', getListTemplate);
templateRouter.get('/detailTemplate', detailTemplate);
templateRouter.post('/deleteTemplate', deleteTemplate);
templateRouter.post('/addTemplate', addTemplate);
templateRouter.post('/updateTemplate', updateTemplate);
