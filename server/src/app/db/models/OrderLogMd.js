import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class OrderLogMd extends ModelBase {
  by;
  byType;
  order;
  note;
  status;
  deletedAt;
}

OrderLogMd.init('OrderLog', {
  by: { type: ObjectId, ref: 'User', required: true },
  byType: { type: String, default: 'user', enum: ['user', 'customer'] },
  order: { type: ObjectId, ref: 'Order', required: true },
  note: { type: String },
  status: { before: { type: Number, enum: [0, 1, 2, 3, 4] }, after: { type: Number, enum: [0, 1, 2, 3, 4] } },
  deletedAt: { type: Date }
});

export const getListOrderLogMd = (where, page, limit, populates, sort, attr) => {
  return OrderLogMd.find({ where, page, limit, sort, attr, populates });
};

export const countListOrderLogMd = (where) => {
  return OrderLogMd.count({ where });
};

export const getDetailOrderLogMd = (where, populates, attr) => {
  return OrderLogMd.findOne({ where, attr, populates });
};

export const addOrderLogMd = (attr) => {
  return OrderLogMd.create({ attr });
};

export const updateOrderLogMd = (where, attr) => {
  return OrderLogMd.update({ where, attr });
};

export const deleteOrderLogMd = (where) => {
  return OrderLogMd.delete({ where });
};
