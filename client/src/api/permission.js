import { getData, postData } from '@lib/axios';

export const getListPermissionApi = (params) => getData('/admin/permission/getListPermission', params);
export const detailPermissionApi = (params) => getData('/admin/permission/detailPermission', params);
export const deletePermissionApi = (params) => postData('/admin/permission/deletePermission', params);
export const addPermissionApi = (params) => postData('/admin/permission/addPermission', params);
export const updatePermissionApi = (params) => postData('/admin/permission/updatePermission', params);
