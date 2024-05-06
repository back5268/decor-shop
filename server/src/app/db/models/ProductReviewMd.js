import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ProductReviewMd extends ModelBase {
  by;
  product;
  rating;
  content;
  file;
  likes;
  deletedAt;
}

ProductReviewMd.init('ProductReview', {
  by: { type: ObjectId, ref: 'User', required: true },
  product: { type: ObjectId, ref: 'Product', required: true },
  rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
  content: { type: String },
  file: { type: String },
  likes: [{ type: ObjectId, ref: 'User' }],
  deletedAt: { type: Date }
});

export const getListProductReviewMd = (where, page, limit, populates, sort, attr) => {
  return ProductReviewMd.find({ where, page, limit, sort, attr, populates });
};

export const countListProductReviewMd = (where) => {
  return ProductReviewMd.count({ where });
};

export const getDetailProductReviewMd = (where, populates, attr) => {
  return ProductReviewMd.findOne({ where, attr, populates });
};

export const addProductReviewMd = (attr) => {
  return ProductReviewMd.create({ attr });
};

export const updateProductReviewMd = (where, attr) => {
  return ProductReviewMd.update({ where, attr });
};

export const deleteProductReviewMd = (where) => {
  return ProductReviewMd.delete({ where });
};
