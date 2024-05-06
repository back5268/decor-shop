import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class CartMd extends ModelBase {
  by;
  product;
  time;
  quantity;
  deletedAt;
}

CartMd.init('Cart', {
  by: { type: ObjectId, ref: 'User', required: true },
  product: { type: ObjectId, ref: 'Product', required: true },
  time: { type: Date, required: true },
  quantity: { type: Number, required: true, min: 0 },
  deletedAt: { type: Date }
});

export const getListCartMd = (where, page, limit, populates, sort, attr) => {
  return CartMd.find({ where, page, limit, sort, attr, populates });
};

export const countListCartMd = (where) => {
  return CartMd.count({ where });
};

export const getDetailCartMd = (where, populates, attr) => {
  return CartMd.findOne({ where, attr, populates });
};

export const addCartMd = (attr) => {
  return CartMd.create({ attr });
};

export const updateCartMd = (where, attr) => {
  return CartMd.update({ where, attr });
};

export const deleteCartMd = (where) => {
  return CartMd.delete({ where });
};
