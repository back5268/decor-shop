import { productType } from '@constant';
import { convertToExcel, handleFileExcel } from '@lib/excel-js';
import { cancelOrderValid, listOrderValid, orderProductValid } from '@lib/validation';
import { generateVietQrLink } from '@lib/viet-qr';
import {
  addOrderMd,
  addUserMd,
  countListOrderMd,
  getDetailOrderMd,
  getDetailProductMd,
  getDetailPromotionMd,
  getListOrderMd,
  updateOrderMd,
  updateProductMd,
  updatePromotionMd
} from '@models';
import { removeVietnameseTones, validateData } from '@utils';
import moment from 'moment';
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
        const product = await getDetailProductMd({ _id: productInfo._id });
        await updateProductMd({ _id: productInfo._id }, { quantity: product?.quantity + productInfo.quantity });
      }
    }

    res.json({ status: true, data: await updateOrderMd({ _id }, { status: 5 }) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const confirmOrder = async (req, res) => {
  try {
    const { _id, value } = req.body;
    const order = await getDetailOrderMd({ _id });
    if (!order) return res.status(400).json({ status: false, mess: 'Đơn hàng không tồn tại!' });
    res.json({ status: true, data: await updateOrderMd({ _id }, { status: 2, transactionCode: value }) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const completeOrder = async (req, res) => {
  try {
    const { _id } = req.body;
    const order = await getDetailOrderMd({ _id });
    if (!order) return res.status(400).json({ status: false, mess: 'Đơn hàng không tồn tại!' });
    res.json({ status: true, data: await updateOrderMd({ _id }, { status: 4 }) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const importOrder = async (req, res) => {
  try {
    if (req.file) {
      const attributes = ['stt', 'customerCode', 'fullName', 'phone', 'createdAt', 'productCode', 'price', 'quantity'];
      const data = await handleFileExcel(req.file, attributes);
      const newData = [];
      data.forEach((d) => {
        const index = newData.findIndex((n) => n.customerCode === d.customerCode);
        if (index >= 0) newData[index].data.push({ productCode: d.productCode, price: d.price, quantity: d.quantity });
        else
          newData.push({
            fullName: d.fullName,
            customerCode: d.customerCode,
            phone: d.phone,
            createdAt: d.createdAt,
            data: [{ productCode: d.productCode, price: d.price, quantity: d.quantity }]
          });
      });
      console.log(newData);

      for (const z of newData) {
        let { fullName, phone, createdAt, data } = z;
        const email = `${removeVietnameseTones(fullName)?.replaceAll(' ', '')}@gmail.com`;
        const username = phone ? phone : email;
        const date = new Date(createdAt);
        phone = phone ? `0${phone}` : undefined;

        const user = await addUserMd({ name: fullName, email, phone, username, lastLogin: date });
        console.log(user);
        let total = 0;
        const productInfo = [];
        const customerInfo = { name: fullName, phone };
        for (const datum of data) {
          const product = await getDetailProductMd({ code: datum.productCode });
          if (!product) continue;
          await updateProductMd({ _id: product._id }, { saleNumber: (product.saleNumber || 0) + (Number(datum.quantity) || 0) });
          productInfo.push({
            name: product.name,
            code: product.code,
            avatar: product.avatar,
            price: datum.price,
            quantity: datum.quantity
          });
          total += Number(datum.quantity) * Number(datum.price);
        }

        const qrCode = generateVietQrLink(total, `${removeVietnameseTones(fullName)?.replaceAll(' ', '')}`);
        await addOrderMd({ by: user._id, productInfo, customerInfo, total, type: 1, status: 4, time: date, qrCode });
      }

      res.status(200).send({ data: {} });
    } else res.status(400).json({ status: false, mess: 'Vui lòng truyền file excel!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const exportOrder = async (req, res) => {
  try {
    const data = await getListOrderMd({}, false, false, false, { time: -1 });
    console.log(data);
    if (data) {
      const documents = data.documents || data;
      const newData = [];
      const mergeDate = [];
      const mergeCustomer = [];
      newData.push(['STT', 'NGÀY BÁN', 'HỌ TÊN', 'SỐ ĐIỆN THOẠI', 'SẢN PHẨM', 'ĐƠN GIÁ', 'SỐ LƯỢNG', 'DOANH THU', 'TỔNG HÓA ĐƠN']);
      if (documents && documents.length > 0) {
        let index = 1;
        let i = 1;
        for (let datum of documents) {
          const date = datum.time ? moment(datum.time).format('DD/MM/YYYY') : '';
          const customerInfo = datum.customerInfo;
          const productInfo = datum.productInfo;
          const checkDate = mergeDate.findIndex((m) => m.date === date);
          if (checkDate >= 0) mergeDate[checkDate].to = i + productInfo.length - 1;
          else mergeDate.push({ date, from: i });
          mergeCustomer.push({ from: i, to: i + productInfo.length - 1 });
          productInfo.forEach((p) => {
            newData.push([
              index,
              datum.time ? moment(datum.time).format('DD/MM/YYYY') : '',
              customerInfo.name || '',
              customerInfo.phone || '',
              p.name || '',
              Number(p.price),
              Number(p.quantity) || 1,
              Number(p.price) * (Number(p.quantity) || 1),
              Number(datum.total)
            ]);
            i += 1;
          });
          index += 1;
        }
      }
      const mergeCells = []

      mergeDate.forEach(m => {
        if (m.from && m.to) mergeCells.push(`B${m.from + 1}:B${m.to +1}`)
      })

      mergeCustomer.forEach(m => {
        if (m.from && m.to) {
          mergeCells.push(`A${m.from + 1}:A${m.to + 1}`)
          mergeCells.push(`C${m.from + 1}:C${m.to + 1}`)
          mergeCells.push(`D${m.from + 1}:D${m.to + 1}`)
          mergeCells.push(`I${m.from + 1}:I${m.to + 1}`)
        }
      })

      console.log(mergeCells);
      res
        .status(200)
        .attachment('file.xlsx')
        .send(await convertToExcel(newData, { fromRow: 0, mergeCells }));
    } else res.status(400).json({ status: false, mess });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
