import { ModelBase } from '@config';

class DistrictMd extends ModelBase {
    name
}

DistrictMd.init('district', {
  name: { type: String, required: true },
  city: { type: String, required: true },
  deletedAt: { type: Date }
});

export const getListDistrictMd = (where, page, limit, populates, sort, attr) => {
  return DistrictMd.find({ where, page, limit, sort, attr, populates });
};

export const countListDistrictMd = (where) => {
  return DistrictMd.count({ where });
};

export const getDetailDistrictMd = (where, populates, attr) => {
  return DistrictMd.findOne({ where, attr, populates });
};

export const addDistrictMd = (attr) => {
  return DistrictMd.create({ attr });
};

export const updateDistrictMd = (where, attr) => {
  return DistrictMd.update({ where, attr });
};

export const deleteDistrictMd = (where) => {
  return DistrictMd.delete({ where });
};
