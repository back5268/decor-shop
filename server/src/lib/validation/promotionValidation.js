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
  title: 'string',
  start: 'datetime',
  end: 'datetime',
  amountType: 'number',
  amount: 'number',
  code: 'string',
  max: 'number',
  description: { type: 'string', allowNull: true },
  amountMax: { type: 'number', allowNull: true },
};

export const checkPromotionValid = {
  code: 'string'
};
