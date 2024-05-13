export const listPromotionValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  type: { type: 'number', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailPromotionValid = {
  _id: 'string'
};

export const addPromotionValid = {
  type: 'number',
  title: 'string',
  start: 'datetime',
  end: 'datetime',
  amountType: 'number',
  amount: 'number',
  code: { type: 'string', allowNull: true },
  max: { type: 'number', allowNull: true },
  description: { type: 'string', allowNull: true },
  products: { type: 'json', allowNull: true },
};

export const updatePromotionValid = {
  _id: 'string',
  amountType: { type: 'number', allowNull: true },
  amount: { type: 'number', allowNull: true },
  start: { type: 'datetime', allowNull: true },
  end: { type: 'datetime', allowNull: true },
  title: { type: 'string', allowNull: true },
  description: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  max: { type: 'number', allowNull: true },
  status: { type: 'number', allowNull: true },
  products: { type: 'json', allowNull: true },
};
