/*
 * @Author: your name
 * @Date: 2021-08-07 10:24:35
 * @LastEditTime: 2021-08-09 13:48:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\kpiChart\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_KPI)
const chrequst = axios(process.env.VUE_APP_POWEBI_KPI)
const rr = axios(process.env.VUE_APP_AON)

export function kpiDetail(params) {
  return requst({
    url: '/web/kpi/totalScore/template/detail',
    method: 'GET',
    params: params
  })
}


export function slelectkpiList(params) {
  return requst({
    url: '/web/kpi/template/list',
    method: 'GET',
    params: params
  })
}

// kpi 下载
export function dowbloadAPI(data) {
  return requst({
    url: '/web/kpi/template/download',
    method: 'POST',
    responseType: 'blob',
    data: data
  })
}

// 概览api
export function getPowerBiKpi() {
  return chrequst({
    url: '/web/aon/batchOverview/getSpiPbi',
    method: 'GET'
  })
}

// 查询供应商api
export function getPowerBiSupplier(params) {
  return requst({
    url: '/web/supplierInfo/queryByParam',
    method: 'GET',
    params: params
  })
}


// 查询材料组
export function getMaterialGroupByUserIds(data) {
  return chrequst({
    url: '/web/aon/costStructure/getMaterialGroupByUserIds',
    method: 'POST',
    data: data
  })
}

// 获取折线图

export function getLine(data) {
  return requst({
    url: '/web/spi/spiTotalScore/getSpiIndexDistribute',
    method: 'POST',
    data: data
  })
}
// 获取供应商列表
export function spiTotalScore(data) {
  return requst({
    url: '/web/spi/spiTotalScore/info',
    method: 'POST',
    data: data
  })
}

// 科股
export function getRelationship(data) {
  return requst({
    url: '/web/shareRelationship/getRelationship',
    method: 'POST',
    data: data
  })
}
// 工艺组
export function getStuffByCategory(data) {
  return requst({
    url: '/web/spi/spiTotalScore/getStuffByCategory',
    method: 'POST',
    data: data
  })
}

// 折叠表头页面
export function getTableData(data) {
  return requst({
    url: '/web/kpi/totalScore/list',
    method: 'GET',
    params: data
  })
}



