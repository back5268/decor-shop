export const listTransactionValid = {
  page: 'number',
  limit: 'number',
  fromDate: { type: 'datetime', allowNull: true },
  toDate: { type: 'datetime', allowNull: true }
};
