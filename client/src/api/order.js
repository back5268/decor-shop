import { getData, postData } from '@lib/axios';

export const getListOrderApi = (params) => getData('/admin/orders/getListOrder', params);
export const getListOrderByUserApi = (params) => getData('/web/orders/getListOrderByUser', params);
export const orderProductApi = (params) => postData('/web/orders/orderProduct', params);
export const cancelOrderApi = (params) => postData('/web/orders/cancelOrder', params);
export const checkPromotionApi = (params) => postData('/web/orders/checkPromotion', params);
export const confirmOrderApi = (params) => postData('/admin/orders/confirmOrder', params);
export const completeOrderApi = (params) => postData('/admin/orders/completeOrder', params);
