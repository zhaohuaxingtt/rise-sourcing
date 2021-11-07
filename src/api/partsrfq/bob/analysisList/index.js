/*
 * @Author: youyuan
 * @Date: 2021-06-28 10:46:03
 * @LastEditTime: 2021-08-19 10:59:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\partsrfq\bob\analysisList\index.js
 */
import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_POWEBI_KPI + '/aon/web/aon')

export function getBobAnalysisDataList(params) {
  return request({
    url: '/bobAnalysisScheme/page/list',
    method: 'POST',
    data: params,
  })
}

export function fetchStaick(params) {
  return request({
    url: '/bobAnalysisScheme/updateTop',
    method: 'POST',
    data: params,
  })
}

export function fetchEdit(params) {
  return request({
    url: '/bobAnalysisScheme/bobAnalysisSchemeEdit',
    method: 'POST',
    data: params,
  })
}

export function fetchDel(params) {
  return request({
    url: '/bobAnalysisScheme',
    method: 'DELETE',
    data: params,
  })
}

// 数据初始化-内部进入
export function initIn(parmars) {
  return request({
    url: '/bobAnalysisScheme/initIn',
    method: 'POST',
    data: parmars,
  })
}
// 数据初始化-外部进入
export function initOut(parmars) {
  return request({
    url: '/bobAnalysisScheme/initOut',
    method: 'POST',
    data: parmars,
  })
}

// 更新分析方案信息
export function update(parmars) {
  return request({
    url: '/bobAnalysisScheme/update',
    method: 'POST',
    data: parmars,
  })
}

// 新增报告
export function add(parmars) {
  return request({
    url: '/bobReport/add',
    method: 'POST',
    data: parmars,
  })
}

// 查询零件号列表
export function part({ data, analysisSchemeId }) {
  return request({
    url: `/bobAnalysisScheme/query/part/${analysisSchemeId}`,
    method: 'POST',
    data,
  })
}
// 查询零件号列表
export function supplier({ data, analysisSchemeId }) {
  return request({
    url: `/bobAnalysisScheme/query/supplier/${analysisSchemeId}`,
    method: 'POST',
    data,
  })
}
// 查询零件号列表
export function turn({ data, analysisSchemeId }) {
  return request({
    url: `/bobAnalysisScheme/query/turn/${analysisSchemeId}`,
    method: 'POST',
    data,
  })
}
// 查询零件号列表
export function querySupplierTurnPartList({ data, analysisSchemeId }) {
  return request({
    url: `/bobAnalysisScheme/query/querySupplierTurnPartList/${analysisSchemeId}`,
    method: 'POST',
    data,
  })
}

// 费用详情下载
export function down(params) {
  return request({
    url: `/bobRoundDetail/down`,
    method: 'POST',
    params,
  })
}
// 生成新的操作批次组ID
export function generateGroupId() {
  return request({
    url: '/bobAnalysisScheme/generateGroupId',
    method: 'GET',
    // data: parmars,
  })
}
