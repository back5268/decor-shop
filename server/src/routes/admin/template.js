import { addTemplate, deleteTemplate, detailTemplate, getListTemplate, updateTemplate } from '@controller';
import { userMiddleware } from '@middleware';
import express from 'express';

export const templateRouter = express.Router();

templateRouter.use(userMiddleware);
templateRouter.get('/getListTemplate', getListTemplate);
templateRouter.get('/detailTemplate', detailTemplate);
templateRouter.delete('/deleteTemplate', deleteTemplate);
templateRouter.post('/addTemplate', addTemplate);
templateRouter.post('/updateTemplate', updateTemplate);
