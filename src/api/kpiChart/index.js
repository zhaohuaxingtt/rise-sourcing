import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_KPI)
const chrequst = axios(process.env.VUE_APP_POWEBI_KPI)

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
export function getPowerBiKpi(params) {
  return chrequst({
    url: '/api/aon/batchOverview/getSpiPbi',
    method: 'GET',
    params: params
  })
}

