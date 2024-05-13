import express from 'express';
import { getListProductInfo, getListTool, getListUserInfo } from '@controller';

export const infoRouter = express.Router();

infoRouter.get('/getListUserInfo', getListUserInfo);
infoRouter.get('/getListProductInfo', getListProductInfo);
infoRouter.get('/getListTool', getListTool);
