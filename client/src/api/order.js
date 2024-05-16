import { getData, postData } from '@lib/axios';

export const getListOrderByUserApi = (params) => getData('/web/orders/getListOrderByUser', params);
export const orderProductApi = (params) => postData('/web/orders/orderProduct', params);
export const cancelOrderApi = (params) => postData('/web/orders/cancelOrder', params);
export const checkPromotionApi = (params) => postData('/web/orders/checkPromotion', params);
