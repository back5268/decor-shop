import { getData, postData } from '@lib/axios';

export const getListNewsApi = (params) => getData('/admin/news/getListNews', params);
export const detailNewsApi = (params) => getData('/admin/news/detailNews', params);
export const deleteNewsApi = (params) => postData('/admin/news/deleteNews', params);
export const addNewsApi = (params) => postData('/admin/news/addNews', params);
export const updateNewsApi = (params) => postData('/admin/news/updateNews', params);

export const getListNewsWebApi = (params) => getData('/web/news/getListNews', params);
