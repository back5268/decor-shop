export const orderProductValid = {
  products: 'json',
  type: 'number',
  name: 'string',
  phone: 'string',
  city: 'string',
  district: 'string',
  ward: 'string',
  address: 'string',
  promotionCode: { type: 'string', allowNull: true },
  note: { type: 'string', allowNull: true }
};

export const listOrderValid = {
  page: 'number',
  limit: 'number',
  status: { type: 'string', allowNull: true }
};

export const cancelOrderValid = {
  _id: 'string',
};
