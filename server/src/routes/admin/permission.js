import { addPermission, deletePermission, detailPermission, getListPermission, updatePermission } from '@controller';
import { authMiddleware } from '@middleware';
import express from 'express';

export const permissionRouter = express.Router();

permissionRouter.use(authMiddleware);
permissionRouter.get('/getListPermission', getListPermission);
permissionRouter.get('/detailPermission', detailPermission);
permissionRouter.post('/deletePermission', deletePermission);
permissionRouter.post('/addPermission', addPermission);
permissionRouter.post('/updatePermission', updatePermission);
