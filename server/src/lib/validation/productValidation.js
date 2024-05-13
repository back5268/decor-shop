export const listProductValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  type: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailProductValid = {
  _id: 'string'
};

export const detailHistoryProductValid = {
  productId: 'string',
  page: 'number',
  limit: { type: 'number', allowNull: true }
};

export const addProductValid = {
  name: 'string',
  code: 'string',
  type: 'string',
  price: 'number',
  description: { type: 'string', allowNull: true },
  hastag: { type: 'json', allowNull: true }
};

export const updateProductValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  type: { type: 'string', allowNull: true },
  price: { type: 'number', allowNull: true },
  description: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  avatar: { type: 'string', allowNull: true },
  images: { type: 'json', allowNull: true },
  hastag: { type: 'json', allowNull: true }
};

export const addReceiptValid = {
  product: 'string',
  type: 'string',
  price: 'number',
  quantity: 'number',
  time: { type: 'string', allowNull: true },
  note: { type: 'string', allowNull: true }
};
