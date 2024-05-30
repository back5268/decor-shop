import { productType } from '@constant';
import { cancelOrderValid, listOrderValid, orderProductValid } from '@lib/validation';
import { generateVietQrLink } from '@lib/viet-qr';
import {
  addOrderMd,
  countListOrderMd,
  getDetailOrderMd,
  getDetailProductMd,
  getDetailPromotionMd,
  getListOrderMd,
  updateOrderMd,
  updateProductMd,
  updatePromotionMd
} from '@models';
import { validateData } from '@utils';
import { v4 as uuidv4 } from 'uuid';

export const getListOrderByUser = async (req, res) => {
  try {
    const { error, value } = validateData(listOrderValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, status } = value;
    const where = { by: req.userInfo._id };
    if (status || status === 0) where.status = status;
    const documents = await getListOrderMd(where, page, limit);
    const total = await countListOrderMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListOrder = async (req, res) => {
  try {
    const { error, value } = validateData(listOrderValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, status } = value;
    const where = {};
    if (status || status === 0) where.status = status;
    const documents = await getListOrderMd(where, page, limit);
    const total = await countListOrderMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const orderProduct = async (req, res) => {
  try {
    const { error, value } = validateData(orderProductValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { type, products, name, phone, city, district, ward, address, promotionCode, note } = value;

    const customerInfo = { name, phone, city, district, ward, address };
    let total = 0;
    let amount = 0;
    const productInfo = [];
    for (const p of products) {
      const product = await getDetailProductMd({ _id: p._id, status: 1 });
      if (!product) return res.status(400).json({ status: false, mess: 'Sản phẩm không tồn tại' });
      p.number = product.quantity - p.quantity;
      p.saleNumber = product.saleNumber + p.quantity;
      if (p.number < 0) return res.status(400).json({ status: false, mess: `Số lượng sản phẩm "${product.name}" trong kho không đủ!` });
      productInfo.push({
        avatar: product.avatar,
        _id: product._id,
        name: product.name,
        code: product.code,
        price: product.price,
        sale: product.sale,
        type: productType.find((p) => product.type === p.key)?.label
      });
      total += (product.price - product.sale || 0) * p.quantity;
    }

    if (promotionCode) {
      const promotion = await getDetailPromotionMd({
        code: promotionCode,
        status: 1,
        start: { $lte: new Date() },
        end: { $gte: new Date() },
        max: { $gte: 0 }
      });
      if (!promotion) return res.status(400).json({ status: false, mess: `Mã khuyến mãi không tồn tại hoặc đã hết hạn sử dụng` });
      await updatePromotionMd({ _id: promotion._id }, { max: promotion.max - 1 });
      amount = promotion.amountType === 1 ? promotion.amount : (promotion.amount * total) / 100;
      if (promotion.amountMax && promotion.amountMax < amount) amount = promotion.amountMax;
      total -= amount;
    }

    for (const p of products) {
      await updateProductMd({ _id: p._id }, { saleNumber: p.saleNumber, quantity: p.number });
    }

    total = total < 0 ? 0 : total;
    const status = type === 1 ? 1 : 0;
    const code = type === 1 ? uuidv4()?.toUpperCase() : undefined;
    const qrCode = type === 1 ? generateVietQrLink(total, code) : undefined;
    const data = await addOrderMd({
      by: req.userInfo._id,
      code,
      type,
      customerInfo,
      productInfo,
      total,
      promotion: amount,
      qrCode,
      note,
      status
    });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { error, value } = validateData(cancelOrderValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;

    const order = await getDetailOrderMd({ _id });
    if (!order) return res.status(400).json({ status: false, mess: 'Đơn hàng không tồn tại!' });

    if (order.productInfo?.length > 0) {
      for (const productInfo of order.productInfo) {
        const product = await getDetailProductMd({ _id: productInfo._id })
        await updateProductMd({ _id: productInfo._id }, { quantity: product?.quantity + productInfo.quantity })
      }
    }

    res.json({ status: true, data: await updateOrderMd({ _id }, { status: 5 }) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
