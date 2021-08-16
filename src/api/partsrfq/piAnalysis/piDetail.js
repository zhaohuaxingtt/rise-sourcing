/*
 * @Author: moxuan
 * @Description: PI详情
 */

import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_AON);

//获取原材料下拉 类别 牌号 区域
export function getSelectMateria(params) {
  return request({
    url: '/piPartCostEntity/selectMateria',
    method: 'POST',
    data: params,
  });
}

//获取人力成本下拉 类别 牌号 区域
export function getSelectManpower(params) {
  return request({
    url: '/piPartCostEntity/queryLabour',
    method: 'POST',
    data: params,
  });
}

//获取汇率下拉 - 国家
export function getSelectCountry(params) {
  return request({
    url: '/piPartCostEntity/queryCurrency',
    method: 'POST',
    data: params,
  });
}

//获取汇率下拉 - 币种
export function getSelectExchange(params) {
  return request({
    url: '/piPartCostEntity/queryExchange',
    method: 'POST',
    data: params,
  });
}

//方案详情
export function getAnalysisSchemeDetails(params) {
  return request({
    url: '/piAnalysisScheme/analysisSchemeDetails',
    method: 'POST',
    data: params,
  });
}
