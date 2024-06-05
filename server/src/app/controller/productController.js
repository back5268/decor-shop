import { uploadFileToFirebase } from '@lib/firebase';
import {
  addProductValid,
  addReceiptValid,
  detailHistoryProductValid,
  detailProductValid,
  listProductValid,
  updateProductValid
} from '@lib/validation';
import {
  addHistoryMd,
  addProductMd,
  countListHistoryMd,
  countListProductMd,
  countListProductReviewMd,
  deleteProductMd,
  getDetailProductMd,
  getListHistoryMd,
  getListProductMd,
  getListProductReviewMd,
  updateProductMd
} from '@models';
import { removeSpecialCharacter, validateData } from '@utils';
import moment from 'moment';

export const getListProduct = async (req, res) => {
  try {
    const { error, value } = validateData(listProductValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, type, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    if (type) where.type = type;
    const documents = await getListProductMd(where, page, limit);
    const total = await countListProductMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListProductWeb = async (req, res) => {
  try {
    const { page, limit, keySearch, type, sort, vote, fromPrice = 0, toPrice = Number.MAX_SAFE_INTEGER } = req.query;
    const where = { status: 1 };
    where.$and = [{ price: { $gte: fromPrice } }, { price: { $lte: toPrice } }];
    if (vote) where.vote = { $gte: vote }
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }];
    if (type) where.type = type;
    const data = await getListProductMd(where, page || 1, limit, false, sort, "_id name price sale quantity saleNumber avatar images vote");
    if (page && limit && type) {
      const total = await countListProductMd(where)
      res.json({ status: true, data: { data, total } });
    } else res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListProductReviewWeb = async (req, res) => {
  try {
    const { page, limit, product } = req.query;
    const data = await getListProductReviewMd({ product }, page, limit);
    const total = await countListProductReviewMd({ product }, page, limit);
    res.json({ status: true, data: { data, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListProductInfo = async (req, res) => {
  try {
    const data = await getListProductMd({}, false, false, false, false, "_id name code price");
    res.json({ status: true, data });
  } catch (error) {
    console.log(1);
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailProduct = async (req, res) => {
  try {
    const { error, value } = validateData(detailProductValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await getDetailProductMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Sản phẩm không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { error, value } = validateData(detailProductValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await deleteProductMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Sản phẩm không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailHistoryProduct = async (req, res) => {
  try {
    const { error, value } = validateData(detailHistoryProductValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { productId, page, limit = 10 } = value;
    const where = { product: productId };
    const documents = await getListHistoryMd(where, page, limit);
    const total = await countListHistoryMd(where);
    const isLastPage = page >= total / limit;
    res.json({ status: true, data: { documents, nextPage: !isLastPage ? page + 1 : undefined } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { error, value } = validateData(addProductValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    let { name, code, type, price, description, sale, quantity } = value;

    const checkName = await getDetailProductMd({ name });
    if (checkName) return res.status(400).json({ status: false, mess: 'Tên sản phẩm đã đã tồn tại!' });

    const checkCode = await getDetailProductMd({ code });
    if (checkCode) return res.status(400).json({ status: false, mess: 'Mã sản phẩm đã tồn tại!' });

    let avatar;
    let images = [];
    if (req.files?.['avatar']?.[0]) {
      avatar = await uploadFileToFirebase(req.files['avatar'][0]);
    }
    if (req.files?.['images']?.[0]) {
      for (let file of req.files['images']) {
        images.push(await uploadFileToFirebase(file));
      }
    }

    const slug = removeSpecialCharacter(name);
    const data = await addProductMd({
      by: req.userInfo._id,
      name,
      code,
      type,
      price,
      slug,
      description,
      avatar,
      images,
      quantity,
      sale,
      vote: 5
    });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { error, value } = validateData(updateProductValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    let { _id, name, code, type, price, description, status, avatar, images, slug, sale, quantity } = value;

    const product = await getDetailProductMd({ _id });
    if (!product) return res.status(400).json({ status: false, mess: 'Sản phẩm không tồn tại!' });

    if (name) {
      const checkName = await getDetailProductMd({ name });
      if (checkName) return res.status(400).json({ status: false, mess: 'Tên sản phẩm đã tồn tại!' });
      slug = removeSpecialCharacter(name);
    }

    if (code) {
      const checkCode = await getDetailProductMd({ code });
      if (checkCode) return res.status(400).json({ status: false, mess: 'Mã sản phẩm đã tồn tại!' });
    }

    if (req.files?.['images']?.[0]) {
      images = images ? typeof images === 'object' ? images : [images] : []
      for (let file of req.files['images']) {
        images.push(await uploadFileToFirebase(file));
      }
    }
    if (req.files?.['avatar']?.[0]) {
      avatar = await uploadFileToFirebase(req.files['avatar'][0]);
    }

    const data = await updateProductMd({ _id }, { name, code, type, price, description, quantity, status, avatar, slug, images, sale });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addReceipt = async (req, res) => {
  try {
    const { error, value } = validateData(addReceiptValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    let { product, type, price, quantity, time, note } = value;

    time = time ? time : moment().format('YYYY-MM-DD HH:mm:ss')
    const checkProduct = await getDetailProductMd({ _id: product });
    if (!checkProduct) return res.status(400).json({ status: false, mess: 'Sản phẩm không tồn tại!' });

    if (!['imp', 'exp'].includes(type)) return res.status(400).json({ status: false, mess: 'Loại thao tác không đúng!' });
    else {
      if (type === 'imp') await updateProductMd({ _id: product }, { quantity: checkProduct.quantity + quantity });
      else {
        const newQuantity = checkProduct.quantity - quantity;
        if (newQuantity < 0) return res.status(400).json({ status: false, mess: 'Số lượng sản phẩm trong kho không đủ!' });
        await updateProductMd({ _id: product }, { quantity: newQuantity });
      }
    }

    let file;
    if (req.files?.['file']?.[0]) {
      file = await uploadFileToFirebase(req.files['file'][0]);
    }

    const data = await addHistoryMd({ by: req.userInfo._id, byType: 'user', product, type, price, quantity, time, note, file });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
