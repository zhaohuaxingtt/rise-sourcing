/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-23 15:46:08
 * @LastEditors: zbin
 * @Descripttion: your project
 */
import axios from '@/utils/axios'
const requstParts = axios(process.env.VUE_APP_PARTSPROCURE)

const request = axios(process.env.VUE_APP_AON)

//车型计划产量与现实累计产量分析（截止2021-02）
export function getCarModelProjectList(params) {
  return request({
    url: '/vpAnalysisScheme/getCarModelProjectList',
    method: 'POST',
    data: params
  })
}
//零件列表-全量零件
export function getPartsList(params) {
  return request({
    url: '/vpAnalysisScheme/getPartsList',
    method: 'POST',
    data: params
  })
}
//零件列表
export function materialGroupSelectDict(params) {
  return requstParts({
    url: '/materialGroupSelectDict',
    method: 'GET',
    data: params
  })
}
//零件列表-查找零件
export function searchCarParts(params) {
  return request({
    url: '/vpAnalysisScheme/searchCarParts',
    method: 'POST',
    data: params
  })
}
//零件列表-保存-进入分析
export function saveCarParts(params) {
  return request({
    url: '/vpAnalysisScheme/saveCarParts',
    method: 'POST',
    data: params
  })
}
