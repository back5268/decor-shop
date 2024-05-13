import { getData, postData } from '@lib/axios';

export const getListPromotionApi = (params) => getData('/admin/promotions/getListPromotion', params);
export const detailPromotionApi = (params) => getData('/admin/promotions/detailPromotion', params);
export const deletePromotionApi = (params) => postData('/admin/promotions/deletePromotion', params);
export const addPromotionApi = (params) => postData('/admin/promotions/addPromotion', params);
export const updatePromotionApi = (params) => postData('/admin/promotions/updatePromotion', params);
