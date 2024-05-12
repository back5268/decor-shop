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
  getDetailProductMd,
  getListHistoryMd,
  getListProductMd,
  updateProductMd
} from '@models';
import { removeSpecialCharacter, validateData } from '@utils';

export const getListProduct = async (req, res) => {
  try {
    const { error, value } = validateData(listProductValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, category, type, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    if (category) where.category = category;
    if (type) where.type = type;
    const documents = await getListProductMd(where, page, limit);
    const total = await countListProductMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
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
    let { name, code, type, price, description } = value;

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
      for (let file of req.files['files']) {
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
      images
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
    let { _id, name, code, type, price, description, status, avatar, images, slug } = value;

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

    if (req.files?.['files']?.[0]) {
      images = typeof images === 'object' ? images : [];
      for (let file of req.files['files'][0]) {
        images.push(await uploadFileToFirebase(file));
      }
    }
    if (req.files?.['avatar']?.[0]) {
      avatar = await uploadFileToFirebase(req.files['avatar'][0]);
    }

    const data = await updateProductMd({ _id }, { name, code, type, price, description, status, avatar, slug, images });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addReceipt = async (req, res) => {
  try {
    const { error, value } = validateData(addReceiptValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { product, type, price, quantity, time, note } = value;

    const checkProduct = await getDetailProductMd({ _id: product });
    if (!checkProduct) return res.status(400).json({ status: false, mess: 'Sản phẩm không tồn tại!' });

    if (!['imp', 'exp'].includes(type)) return res.status(400).json({ status: false, mess: 'Loại thao tác không đúng!' });
    else {
      if (type === 'imp') await updateProductMd({ quantity: checkProduct.quantity + quantity }, { _id: product });
      else {
        const newQuantity = checkProduct.quantity - quantity;
        if (newQuantity < 0) return res.status(400).json({ status: false, mess: 'Số lượng sản phẩm trong kho không đủ!' });
        await updateProductMd({ quantity: newQuantity }, { _id: product });
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
