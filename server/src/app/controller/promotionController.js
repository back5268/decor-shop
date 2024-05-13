import { addPromotionValid, detailPromotionValid, listPromotionValid, updatePromotionValid } from '@lib/validation';
import {
  addPromotionMd,
  countListPromotionMd,
  deletePromotionMd,
  getDetailPromotionMd,
  getListPromotionMd,
  updatePromotionMd
} from '@models';
import { validateData } from '@utils';

export const getListPromotion = async (req, res) => {
  try {
    const { error, value } = validateData(listPromotionValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, status, type } = value;
    const where = {};
    if (keySearch) where.$or = [{ title: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    if (type) where.type = type;
    const documents = await getListPromotionMd(where, page, limit);
    const total = await countListPromotionMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailPromotion = async (req, res) => {
  try {
    const { error, value } = validateData(detailPromotionValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await getDetailPromotionMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Khuyến mãi không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deletePromotion = async (req, res) => {
  try {
    const { error, value } = validateData(detailPromotionValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await deletePromotionMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Khuyến mãi không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addPromotion = async (req, res) => {
  try {
    const { error, value } = validateData(addPromotionValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    let { type, title, start, end, amountType, amount, code, max, description, products } = value;

    const checkTitle = await getDetailPromotionMd({ title });
    if (checkTitle) return res.status(400).json({ status: false, mess: 'Tiêu đề đã tồn tại!' });

    if (type === 2) {
      if (!code) return res.status(400).json({ status: false, mess: 'Vui lòng nhập mã khuyến mãi!' });
      if (!max) return res.status(400).json({ status: false, mess: 'Vui lòng nhập giới hạn khuyến mãi!' });
      const checkCode = await getDetailPromotionMd({ code });
      if (checkCode) return res.status(400).json({ status: false, mess: 'Mã khuyến mãi đã tồn tại!' });
    }

    const data = await addPromotionMd({
      by: req.userInfo._id,
      type,
      title,
      start,
      end,
      amountType,
      amount,
      code,
      max,
      description,
      products
    });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updatePromotion = async (req, res) => {
  try {
    const { error, value } = validateData(updatePromotionValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, amountType, amount, start, end, title, description, code, max, status, products } = value;

    const promotion = await getDetailPromotionMd({ _id });
    if (!promotion) return res.status(400).json({ status: false, mess: 'Mẫu thông báo không tồn tại!' });

    if (title) {
      const checkTitle = await getDetailPromotionMd({ title });
      if (checkTitle) return res.status(400).json({ status: false, mess: 'Tiêu đề đã tồn tại!' });
    }

    if (code) {
      const checkCode = await getDetailPromotionMd({ code });
      if (checkCode) return res.status(400).json({ status: false, mess: 'Mã khuyến mãi đã tồn tại!' });
    }

    const data = await updatePromotionMd(
      { _id },
      { updateBy: req.userInfo._id, amountType, amount, start, end, title, description, code, max, status, products }
    );
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
