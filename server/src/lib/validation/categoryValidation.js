export const listCategoryValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
};

export const detailCategoryValid = {
  _id: 'string'
};

export const addCategoryValid = {
  name: 'string',
  code: 'string',
  description: { type: 'string', allowNull: true }
};

export const updateCategoryValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  description: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};
