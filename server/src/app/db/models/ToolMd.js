import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class ToolMd extends ModelBase {
  name;
  sort;
  icon;
  status;
  children;
  deletedAt;
}

ToolMd.init('Tool', {
  name: { type: String, required: true },
  sort: { type: Number, required: true },
  icon: { type: String },
  status: { type: Number, enum: [0, 1], default: 1 },
  children: [
    {
      name: { type: String, require: true },
      route: { type: String, require: true },
      sort: { type: Number, require: true },
      status: { type: Number, enum: [0, 1], default: 1 },
      actions: [{ type: String, require: true }]
    }
  ],
  deletedAt: { type: Date }
});

export const getListToolMd = (where, page, limit, populates, sort, attr) => {
  return ToolMd.find({ where, page, limit, sort, attr, populates });
};

export const countListToolMd = (where) => {
  return ToolMd.count({ where });
};

export const getDetailToolMd = (where, populates, attr) => {
  return ToolMd.findOne({ where, attr, populates });
};

export const addToolMd = (attr) => {
  return ToolMd.create({ attr });
};

export const updateToolMd = (where, attr) => {
  return ToolMd.update({ where, attr });
};

export const deleteToolMd = (where) => {
  return ToolMd.delete({ where });
};
