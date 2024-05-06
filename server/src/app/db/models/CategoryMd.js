import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class CategoryMd extends ModelBase {
  by;
  updateBy;
  name;
  code;
  description;
  status;
  deletedAt;
}

CategoryMd.init('Category', {
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String },
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const getListCategoryMd = (where, page, limit, populates, sort, attr) => {
  return CategoryMd.find({ where, page, limit, sort, attr, populates });
};

export const countListCategoryMd = (where) => {
  return CategoryMd.count({ where });
};

export const getDetailCategoryMd = (where, populates, attr) => {
  return CategoryMd.findOne({ where, attr, populates });
};

export const addCategoryMd = (attr) => {
  return CategoryMd.create({ attr });
};

export const updateCategoryMd = (where, attr) => {
  return CategoryMd.update({ where, attr });
};

export const deleteCategoryMd = (where) => {
  return CategoryMd.delete({ where });
};
