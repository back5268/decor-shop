import { addProduct, addReceipt, deleteProduct, detailProduct, getListProduct, updateProduct } from '@controller';
import { upload } from '@lib/multer';
import { authMiddleware } from '@middleware';
import express from 'express';

export const productRouter = express.Router();

productRouter.use(authMiddleware);
productRouter.get('/getListProduct', getListProduct);
productRouter.get('/detailProduct', detailProduct);
productRouter.post('/deleteProduct', deleteProduct);
productRouter.post(
  '/addProduct',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]),
  addProduct
);
productRouter.post(
  '/updateProduct',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]),
  updateProduct
);
productRouter.post('/updateProduct', upload.single('file'), addReceipt);
