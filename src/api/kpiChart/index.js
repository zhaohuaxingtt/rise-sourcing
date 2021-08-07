/*
 * @Author: your name
 * @Date: 2021-08-07 10:24:35
 * @LastEditTime: 2021-08-07 12:06:02
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
  return rr({
    url: '/batchOverview/getSpiPbi',
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


// 查询供应商api
export function getMaterialGroupByUserIds(data) {
  return chrequst({
    url: '/api/aon/costStructure/getMaterialGroupByUserIds',
    method: 'POST',
    data: data
  })
}