import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class TransactionMd extends ModelBase {
  type;
  order;
  user;
  tranferType;
  tranfertionInfo;
  time;
  total;
  deletedAt;
}

TransactionMd.init('Transaction', {
  type: { type: Number, enum: [1, 2], description: '1: Thanh toán đơn hàng, 2: Nạp tiền tài khoản' },
  order: { type: ObjectId, ref: 'Order' },
  user: { type: ObjectId, ref: 'User' },
  tranferType: { type: Number, enum: [1, 2], description: '1: Chuyển khoản, 2: Chuyển tiền từ ví, 3: Tiền mặt' },
  tranfertionInfo: { type: Object, required: true },
  time: { type: Date },
  total: { type: Number, required: true },
  deletedAt: { type: Date }
});

export const getListTransactionMd = (where, page, limit, populates, sort, attr) => {
  return TransactionMd.find({ where, page, limit, sort, attr, populates });
};

export const countListTransactionMd = (where) => {
  return TransactionMd.count({ where });
};

export const getDetailTransactionMd = (where, populates, attr) => {
  return TransactionMd.findOne({ where, attr, populates });
};

export const addTransactionMd = (attr) => {
  return TransactionMd.create({ attr });
};

export const updateTransactionMd = (where, attr) => {
  return TransactionMd.update({ where, attr });
};

export const deleteTransactionMd = (where) => {
  return TransactionMd.delete({ where });
};
