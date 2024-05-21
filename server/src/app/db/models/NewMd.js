import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class NewsMd extends ModelBase {
  by;
  updateBy;
  title;
  content;
  hagtag;
  status;
  time;
  deletedAt;
}

NewsMd.init('News', {
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  hashtag: [{ type: String }],
  status: { type: Number, enum: [0, 1], default: 1 },
  time: { type: Number },
  deletedAt: { type: Date }
});

export const getListNewsMd = (where, page, limit, populates, sort, attr) => {
  return NewsMd.find({ where, page, limit, sort, attr, populates });
};

export const countListNewsMd = (where) => {
  return NewsMd.count({ where });
};

export const getDetailNewsMd = (where, populates, attr) => {
  return NewsMd.findOne({ where, attr, populates });
};

export const addNewsMd = (attr) => {
  return NewsMd.create({ attr });
};

export const updateNewsMd = (where, attr) => {
  return NewsMd.update({ where, attr });
};

export const deleteNewsMd = (where) => {
  return NewsMd.delete({ where });
};
