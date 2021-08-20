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

//平均零件价格成本明细
export function getAveragePartCostPrice(params) {
  return request({
    url: '/piAnalysisScheme/avgPartCostPrice',
    method: 'POST',
    data: params,
  });
}

//price Index方案详情删除零件
export function deleteParts(params) {
  return request({
    url: `/piAnalysisScheme/deleteParts?id=${params.id}`,
    method: 'GET',
  });
}

//price Index价格分析曲线选择框
export function getPiIndexWaveSelectList(params) {
  return request({
    url: '/piAnalysisScheme/piIndexWaveSelectList',
    method: 'POST',
    data: params,
  });
}

//price Index价格分析曲线
export function getPiIndexPartCostWave(params) {
  return request({
    url: '/piAnalysisScheme/piIndexPartCostWave',
    method: 'POST',
    data: params,
  });
}

//保存分析方案
export function saveAnalysisScheme(params) {
  return request({
    url: '/piAnalysisScheme/saveAnalysisScheme',
    method: 'POST',
    data: params,
  });
}

//判断方案名称是否已存在
export function checkName(params) {
  return request({
    url: '/piAnalysisScheme/checkAnalysisSchemeNameIsExists',
    method: 'POST',
    data: params
  })
}
