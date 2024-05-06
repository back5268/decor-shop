import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class NewMd extends ModelBase {
  by;
  updateBy;
  title;
  content;
  hagtag;
  status;
  time;
  type;
  deletedAt;
}

NewMd.init('New', {
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  hagtag: [{ type: String }],
  status: { type: Number, enum: [0, 1], default: 1 },
  time: { type: Date },
  type: { isWeb: { type: Boolean, require: true }, isEmail: { type: Boolean, require: true } },
  deletedAt: { type: Date }
});

export const getListNewMd = (where, page, limit, populates, sort, attr) => {
  return NewMd.find({ where, page, limit, sort, attr, populates });
};

export const countListNewMd = (where) => {
  return NewMd.count({ where });
};

export const getDetailNewMd = (where, populates, attr) => {
  return NewMd.findOne({ where, attr, populates });
};

export const addNewMd = (attr) => {
  return NewMd.create({ attr });
};

export const updateNewMd = (where, attr) => {
  return NewMd.update({ where, attr });
};

export const deleteNewMd = (where) => {
  return NewMd.delete({ where });
};
