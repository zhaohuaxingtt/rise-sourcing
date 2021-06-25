/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-23 15:46:08
 * @LastEditors: zbin
 * @Descripttion: your project
 */
import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_AON)

//车型计划产量与现实累计产量分析（截止2021-02）
export function getCarModelProjectList(params) {
  return request({
    url: '/vpAnalysisScheme/getCarModelProjectList',
    method: 'GET',
    data: params
  })
}
//零件列表
export function getCarModelPartsList(params) {
  return request({
    url: '/vpAnalysisScheme/getCarModelPartsList',
    method: 'GET',
    data: params
  })
}
