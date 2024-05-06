import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class PromotionMd extends ModelBase {
  by;
  updateBy;
  title;
  code;
  description;
  start;
  end;
  products;
  max;
  type;
  amount;
  status;
  deletedAt;
}

PromotionMd.init('Promotion', {
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  title: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String },
  start: { type: Date },
  end: { type: Date },
  products: [{ type: String, required: true }],
  max: { type: Number, min: 0 },
  type: { type: Number, enum: [0, 1], require: true, description: '0: VND, 1: %' },
  amount: { type: Number, min: 0 },
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const getListPromotionMd = (where, page, limit, populates, sort, attr) => {
  return PromotionMd.find({ where, page, limit, sort, attr, populates });
};

export const countListPromotionMd = (where) => {
  return PromotionMd.count({ where });
};

export const getDetailPromotionMd = (where, populates, attr) => {
  return PromotionMd.findOne({ where, attr, populates });
};

export const addPromotionMd = (attr) => {
  return PromotionMd.create({ attr });
};

export const updatePromotionMd = (where, attr) => {
  return PromotionMd.update({ where, attr });
};

export const deletePromotionMd = (where) => {
  return PromotionMd.delete({ where });
};
