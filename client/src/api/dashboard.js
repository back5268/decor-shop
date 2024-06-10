import { getData } from "@lib/axios";

export const getSummaryApi = (params) => getData('/admin/dashboard/getSummary', params);