import { getData } from '@lib/axios';

export const getListUserInfoApi = (params) => getData('/info/getListUserInfo', params);
export const getListToolApi = (params) => getData('/info/getListTool', params);
