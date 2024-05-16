import { getData, postData } from '@lib/axios';

export const getListCartByUserApi = (params) => getData('/web/carts/getListCartByUser', params);
export const addToCartApi = (params) => postData('/web/carts/addToCart', params);
export const deleteCartApi = (params) => postData('/web/carts/deleteCart', params);
