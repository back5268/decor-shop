export const orderProductValid = {
  projects: 'json',
  name: 'string',
  phone: 'string',
  city: 'string',
  district: 'string',
  ward: 'string',
  address: 'string',
  promotionCode: { type: 'string', allowNull: true },
  note: { type: 'string', allowNull: true }
};

export const cancelOrderValid = {
  _id: 'string',
  reason: 'string',
};
