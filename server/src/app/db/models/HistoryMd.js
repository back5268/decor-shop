import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class HistoryMd extends ModelBase {
  by;
  byType;
  productInfo;
  price;
  quantity;
  time;
  type;
  files;
  deletedAt;
}

HistoryMd.init('History', {
  by: { type: ObjectId, ref: 'User', required: true },
  byType: { type: String, default: 'user', enum: ['user', 'customer'] },
  productInfo: { type: ObjectId, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
  time: { type: Date, required: true },
  type: { type: String, enum: ['exp', 'imp'], required: true },
  files: [{ type: String }],
  deletedAt: { type: Date }
});

export const getListHistoryMd = (where, page, limit, populates, sort, attr) => {
  return HistoryMd.find({ where, page, limit, sort, attr, populates });
};

export const countListHistoryMd = (where) => {
  return HistoryMd.count({ where });
};

export const getDetailHistoryMd = (where, populates, attr) => {
  return HistoryMd.findOne({ where, attr, populates });
};

export const addHistoryMd = (attr) => {
  return HistoryMd.create({ attr });
};

export const updateHistoryMd = (where, attr) => {
  return HistoryMd.update({ where, attr });
};

export const deleteHistoryMd = (where) => {
  return HistoryMd.delete({ where });
};
