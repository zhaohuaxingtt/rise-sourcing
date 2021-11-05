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

// 查询选中
export function getListSelected(params) {
  return request({
    url: '/actionClassification/listSelected',
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

//编辑
export function saveReport(params) {
  return request({
    url: '/actionClassification/saveReport',
    method: 'POST',
    data: params,
  });
}
