import { ModelBase } from '@config';

class WardMd extends ModelBase {
    name
}

WardMd.init('ward', {
  name: { type: String, required: true },
  district: { type: String, required: true },
  deletedAt: { type: Date }
});

export const getListWardMd = (where, page, limit, populates, sort, attr) => {
  return WardMd.find({ where, page, limit, sort, attr, populates });
};

export const countListWardMd = (where) => {
  return WardMd.count({ where });
};

export const getDetailWardMd = (where, populates, attr) => {
  return WardMd.findOne({ where, attr, populates });
};

export const addWardMd = (attr) => {
  return WardMd.create({ attr });
};

export const updateWardMd = (where, attr) => {
  return WardMd.update({ where, attr });
};

export const deleteWardMd = (where) => {
  return WardMd.delete({ where });
};
