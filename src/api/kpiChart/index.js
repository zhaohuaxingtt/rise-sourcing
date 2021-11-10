/*
 * @Author: your name
 * @Date: 2021-08-07 10:24:35
 * @LastEditTime: 2021-11-09 11:58:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\api\kpiChart\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_KPI + '/web/aon')
const chrequst = axios(process.env.VUE_APP_POWEBI_KPI + '/web/aon')
const rr = axios(process.env.VUE_APP_POWEBI_KPI + '/web/aon')

export function kpiDetail(params) {
  return requst({
    url: '/web/kpi/totalScore/template/detail',
    method: 'GET',
    params: params,
  })
}

export function slelectkpiList(params) {
  return requst({
    url: '/web/kpi/template/list',
    method: 'GET',
    params: params,
  })
}

// kpi 下载
export function dowbloadAPI(data) {
  return requst({
    url: '/web/kpi/template/download',
    method: 'POST',
    responseType: 'blob',
    data: data,
  })
}

// 概览api
export function getPowerBiKpi() {
  return chrequst({
    url: '/aon/web/aon/batchOverview/getSpiPbi',
    method: 'GET',
  })
}

// 查询供应商api
export function getPowerBiSupplier(data) {
  return requst({
    url: '/web/supplierInfo/queryByParam',
    method: 'POST',
    data: data,
  })
}

// 查询材料组
export function getMaterialGroupByUserIds(data) {
  return chrequst({
    url: '/costStructure/getMaterialGroupByUserIds',
    method: 'POST',
    data: data,
  })
}

// 获取折线图

export function getLine(data) {
  return requst({
    url: '/web/spi/spiTotalScore/getSpiIndexDistribute',
    method: 'POST',
    data: data,
  })
}
// 获取供应商列表
export function spiTotalScore(data) {
  return requst({
    url: '/web/spi/spiTotalScore/info',
    method: 'POST',
    data: data,
  })
}

// 科股
export function getRelationship(data) {
  return requst({
    url: '/web/shareRelationship/getRelationship',
    method: 'POST',
    data: data,
  })
}
// 工艺组
export function getStuffByCategory(data) {
  return requst({
    url: '/web/spi/spiTotalScore/getStuffByCategory',
    method: 'POST',
    data: data,
  })
}

// 折叠表头页面
export function getTableData(data) {
  return requst({
    url: '/web/kpi/totalScore/list',
    method: 'GET',
    params: data,
  })
}
// 折叠列表——获取材料组
export function getCategoryData(data) {
  return requst({
    url: '/web/kpi/totalScore/template/category',
    method: 'GET',
    params: data,
  })
}
// 折叠列表——获取部门
export function getDeptData(data) {
  return requst({
    url: '/web/kpi/totalScore/template/dept',
    method: 'GET',
    params: data,
  })
}

// 查询模板kpi
export function templateDetail(params) {
  return requst({
    url: '/web/kpi/template/detail',
    method: 'GET',
    params: params,
  })
}
// 保存模板
export function saveTemplateDetail(data) {
  return requst({
    url: '/web/kpi/template',
    method: 'POST',
    data: data,
  })
}

// 删除模板
export function deleteTemplate(data) {
  return requst({
    url: '/web/kpi/template/remove',
    method: 'POST',
    data: data,
  })
}

// 下载模板
export function downloadTemplate(data) {
  return requst({
    url: '/web/kpi/template/download',
    method: 'POST',
    responseType: 'blob',
    data: data,
  })
}

// 上传模板
export function uploadTemplate(data) {
  return requst({
    url: '/web/kpi/template/upload',
    method: 'POST',
    data: data,
  })
}

// 获取TO量级
export function getTO(data) {
  return requst({
    url: '/web/supplierToData/yearByAmount',
    method: 'POST',
    data: data,
  })
}
