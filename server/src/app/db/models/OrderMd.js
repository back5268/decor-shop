import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class OrderMd extends ModelBase {
  by;
  code;
  productInfo;
  customerInfo;
  total;
  promotion;
  qrCode;
  note;
  transactionCode;
  type;
  status;
  time;
  deletedAt;
}

OrderMd.init('Order', {
  by: { type: ObjectId, ref: 'User', required: true },
  code: { type: String },
  productInfo: { type: Array, required: true },
  customerInfo: { type: Object, required: true },
  total: { type: Number, required: true, min: 0 },
  promotion: { type: Number, required: true, min: 0 },
  qrCode: { type: String },
  note: { type: String },
  transactionCode: { type: String },
  type: { type: Number, required: true, enum: [1, 2], description: '1: Chuyển khoản, 2: Thanh toán khi nhận hàng' },
  status: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
    description: '0: Thanh toán khi nhận hàng, 1: Chờ thanh toán, 2: Đã thanh toán, 3: Đang giao hàng, 4: Đã nhận hàng, 5: Hủy đơn hàng'
  },
  time: { type: Date, require: true },
  deletedAt: { type: Date }
});

export const getListOrderMd = (where, page, limit, populates, sort, attr) => {
  return OrderMd.find({ where, page, limit, sort, attr, populates });
};

export const countListOrderMd = (where) => {
  return OrderMd.count({ where });
};

export const getDetailOrderMd = (where, populates, attr) => {
  return OrderMd.findOne({ where, attr, populates });
};

export const addOrderMd = (attr) => {
  return OrderMd.create({ attr });
};

export const updateOrderMd = (where, attr) => {
  return OrderMd.update({ where, attr });
};

export const deleteOrderMd = (where) => {
  return OrderMd.delete({ where });
};
