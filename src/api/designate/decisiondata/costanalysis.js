/*
 * @Author: your name
 * @Date: 2021-11-03 20:44:31
 * @LastEditTime: 2021-11-12 12:18:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\designate\decisiondata\costanalysis.js
 */
import axios from "@/utils/axios"
const requst = axios(process.env.VUE_APP_SOURCING)
// 获取定点下rfq列表
export function costanalysisList(nominateId,types) {
  return requst({
    url: `/cost_analysis/${nominateId}/${types}`,
    method: "GET",
  })
}
export function costanalysisShow(data) {
  return requst({
    url: `/cost_analysis/show`,
    method: "PATCH",
    data:data
  })
}
export function costanalysisSort(data) {
  return requst({
    url: `/cost_analysis/sort`,
    method: "PATCH",
    data:data
  })
}


// 获取举措清单
export function costAnalysisGet(params) {
  return requst({
    url: `/cost_analysis/strategy/${ params.nominateAppId }/${ params.type }`,
    method: "get"
  })
}

// 设置举措清单
export function costAnalysisStrage(data) {
  return requst({
    url: `/cost_analysis/strategy`,
    method: "PATCH",
    data
  })
}

//powerBi
export function analysisPowerBi(data) {
  return requst({
    url: `/cost_analysis/powerBi/${data}`,
    method: "GET"
  })
}

// 获取有数据的Tool下拉框
export function getTools(params) {
  return requst({
    url: `/cost_analysis/type/${ params.nominateAppId }`,
    method: "GET"
  })
}