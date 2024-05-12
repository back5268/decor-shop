import { addCategoryValid, detailCategoryValid, listCategoryValid, updateCategoryValid } from '@lib/validation';
import {
  addCategoryMd,
  countListCategoryMd,
  deleteCategoryMd,
  getDetailCategoryMd,
  getListCategoryMd,
  updateCategoryMd,
  updateProductMd
} from '@models';
import { validateData } from '@utils';

export const getListCategory = async (req, res) => {
  try {
    const { error, value } = validateData(listCategoryValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    const documents = await getListCategoryMd(where, page, limit);
    const total = await countListCategoryMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailCategory = async (req, res) => {
  try {
    const { error, value } = validateData(detailCategoryValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await getDetailCategoryMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Danh mục sản phẩm không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { error, value } = validateData(detailCategoryValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await deleteCategoryMd({ _id });
    await updateProductMd({ category: _id }, { category: null });
    if (!data) return res.status(400).json({ status: false, mess: 'Danh mục sản phẩm không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { error, value } = validateData(addCategoryValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    let { name, code, description } = value;

    const checkName = await getDetailCategoryMd({ name });
    if (checkName) return res.status(400).json({ status: false, mess: 'Tên danh mục sản phẩm đã tồn tại!' });

    const checkCode = await getDetailCategoryMd({ code });
    if (checkCode) return res.status(400).json({ status: false, mess: 'Mã danh mục sản phẩm đã tồn tại!' });

    const data = await addCategoryMd({ by: req.userInfo._id, name, code, description });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { error, value } = validateData(updateCategoryValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, name, code, description, status } = value;

    const category = await getDetailcMd({ _id });
    if (!category) return res.status(400).json({ status: false, mess: 'Danh mục sản phẩm không tồn tại!' });

    if (subject) {
      const checkName = await getDetailCategoryMd({ name });
      if (checkName) return res.status(400).json({ status: false, mess: 'Tên danh mục sản phẩm đã tồn tại!' });
    }

    if (code) {
      const checkCode = await getDetailCategoryMd({ code });
      if (checkCode) return res.status(400).json({ status: false, mess: 'Mã danh mục sản phẩm đã tồn tại!' });
    }

    const data = await updateCategoryMd({ _id }, { updateBy: req.userInfo._id, name, code, description, status });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
