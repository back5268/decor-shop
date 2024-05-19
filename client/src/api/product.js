import { getData, postData } from '@lib/axios';

export const getListProductApi = (params) => getData('/admin/products/getListProduct', params);
export const detailProductApi = (params) => getData('/admin/products/detailProduct', params);
export const deleteProductApi = (params) => postData('/admin/products/deleteProduct', params);
export const addProductApi = (params) => postData('/admin/products/addProduct', params, true);
export const addReceiptApi = (params) => postData('/admin/products/addReceipt', params, true);
export const updateProductApi = (params) => postData('/admin/products/updateProduct', params, true);

export const getListProductWebApi = (params) => getData('/web/products/getListProduct', params);
export const detailProductWebApi = (params) => getData('/web/products/detailProduct', params);
export const getListProductReviewWebApi = (params) => getData('/web/products/getListProductReviewWeb', params);
