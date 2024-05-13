import { addUser, deleteUser, detailUser, getListUser, resetPassword, updateUser } from '@controller';
import express from 'express';
import { upload } from '@lib/multer';
import { authMiddleware } from '@middleware';

export const userRouter = express.Router();

userRouter.use(authMiddleware);
userRouter.get('/getListUser', getListUser);
userRouter.get('/detailUser', detailUser);
userRouter.post('/deleteUser', deleteUser);
userRouter.post('/resetPassword', resetPassword);
userRouter.post('/addUser', upload.single('avatar'), addUser);
userRouter.post('/updateUser', upload.single('avatar'), updateUser);
