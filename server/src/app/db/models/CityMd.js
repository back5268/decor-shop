import { ModelBase } from '@config';

class CityMd extends ModelBase {
    name
}

CityMd.init('city', {
  name: { type: String, required: true },
  deletedAt: { type: Date }
});

export const getListCityMd = (where, page, limit, populates, sort, attr) => {
  return CityMd.find({ where, page, limit, sort, attr, populates });
};

export const countListCityMd = (where) => {
  return CityMd.count({ where });
};

export const getDetailCityMd = (where, populates, attr) => {
  return CityMd.findOne({ where, attr, populates });
};

export const addCityMd = (attr) => {
  return CityMd.create({ attr });
};

export const updateCityMd = (where, attr) => {
  return CityMd.update({ where, attr });
};

export const deleteCityMd = (where) => {
  return CityMd.delete({ where });
};
