import { productType } from '@constant';
import { cancelOrderValid, orderProductValid } from '@lib/validation';
import { generateVietQrLink } from '@lib/viet-qr';
import { addOrderMd, getDetailProductMd, getDetailPromotionMd, getListOrderMd, updateOrderMd } from '@models';
import { v4 as uuidv4 } from 'uuid';

export const getListOrderByUser = async (req, res) => {
  try {
    res.json({ status: true, data: await getListOrderMd({ by: req.userInfo._id }) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const orderProduct = async (req, res) => {
  try {
    const { error, value } = validateData(orderProductValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { projects, name, phone, city, district, ward, address, promotionCode, note } = value;

    const customerInfo = { name, phone, city, district, ward, address };
    let total = 0;
    let amount = 0;
    const productInfo = [];
    for (const p of projects) {
      const product = await getDetailProductMd({ _id: p._id, status: 1 });
      if (!product) res.status(400).json({ status: false, mess: 'Sản phẩm không tồn tại' });
      p.number = product.quantity - p.quantity;
      if (p.number) res.status(400).json({ status: false, mess: `Số lượng sản phẩm ${product.name} không đủ` });
      productInfo.push({
        name: product.name,
        code: product.code,
        price: product.price,
        type: productType.find((p) => product.type === p.key)?.label
      });
      total += productInfo.price * productInfo.quantity;
    }

    if (promotionCode) {
      const promotion = await getDetailPromotionMd({ code: promotionCode });
      if (!promotion) res.status(400).json({ status: false, mess: `Mã khuyến mãi không tồn tại hoặc đã hết hạn sử dụng` });
      amount = promotion.amountType === 1 ? promotion.amount : (promotion.amount * total) / 100;
      total -= amount;
    }

    const code = uuidv4()?.toUpperCase();
    const qrCode = generateVietQrLink(total, code);
    res.json({
      status: true,
      data: await addOrderMd({ by: req.userInfo._id, code, customerInfo, productInfo, total, promotion: amount, qrCode, note, status: 1 })
    });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { error, value } = validateData(cancelOrderValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await updateOrderMd({ _id }, { status: 5, reason });
    if (!data) return res.status(400).json({ status: false, mess: 'Đơn hàng không tồn tại!' });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
