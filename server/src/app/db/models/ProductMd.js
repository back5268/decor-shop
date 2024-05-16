import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ProductMd extends ModelBase {
  by;
  name;
  slug;
  code;
  type;
  price;
  sale;
  quantity;
  saleNumber;
  vote;
  description;
  status;
  images;
  avatar;
  deletedAt;
}

ProductMd.init('Product', {
  by: { type: ObjectId, ref: 'User' },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  code: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  sale: { type: Number, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
  saleNumber: { type: Number, default: 0 },
  vote: { type: Number, required: true, min: 0 },
  description: { type: String },
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Thu hồi, 1: Còn bán' },
  images: [{ type: String }],
  avatar: { type: String },
  deletedAt: { type: Date }
});

export const getListProductMd = (where, page, limit, populates, sort, attr) => {
  return ProductMd.find({ where, page, limit, sort, attr, populates });
};

export const countListProductMd = (where) => {
  return ProductMd.count({ where });
};

export const getDetailProductMd = (where, populates, attr) => {
  return ProductMd.findOne({ where, attr, populates });
};

export const addProductMd = (attr) => {
  return ProductMd.create({ attr });
};

export const updateProductMd = (where, attr) => {
  return ProductMd.update({ where, attr });
};

export const deleteProductMd = (where) => {
  return ProductMd.delete({ where });
};
