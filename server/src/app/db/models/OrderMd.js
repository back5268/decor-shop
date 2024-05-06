import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class OrderMd extends ModelBase {
  by;
  ProductInfo;
  CustomerInfo;
  total;
  sale;
  qrCode;
  note;
  status;
  time;
  deletedAt;
}

OrderMd.init('Order', {
  by: { type: ObjectId, ref: 'User', required: true },
  ProductInfo: { type: Object, required: true },
  CustomerInfo: { type: Object, required: true },
  total: { type: Number, required: true, min: 0 },
  sale: { type: Number, required: true, min: 0 },
  qrCode: { type: String, required: true },
  note: { type: String },
  status: {
    type: Number,
    enum: [0, 1, 2, 3, 4],
    description: '0: Chờ thanh toán, 1: Đã thanh toán, 2: Đang giao hàng, 3: Đã nhận hàng, 4: Hủy đơn hàng'
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
