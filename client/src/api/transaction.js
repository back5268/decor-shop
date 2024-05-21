import { getData } from '@lib/axios';

export const getListTransactionApi = (params) => getData('/admin/transactions/getListTransaction', params);
