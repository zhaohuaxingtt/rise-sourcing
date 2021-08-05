/*
 * @Author: moxuan
 * @Description: 举措清单
 */

import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_AON);

//查询列表
export function getList(params) {
  return request({
    url: '/actionClassification/list',
    method: 'POST',
    data: params,
  });
}

//编辑
export function saveInfos(params) {
  return request({
    url: '/actionClassification/modify',
    method: 'POST',
    data: params,
  });
}
