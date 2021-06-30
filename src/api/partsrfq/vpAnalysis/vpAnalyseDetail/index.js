/*
 * @Author: moxuan
 * @Description: vp详情
 */

import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_AON)

//Volume Pricing零件分析
export function getAnalysisProcessing(params) {
  return request({
    url: '/vpAnalysisScheme/analysisProcessing',
    method: 'POST',
    data: params
  })
}

//固定成本--列表查询
export function getVpCostDetail(params) {
  return request({
    url: '/vpCostDetail',
    method: 'POST',
    data: params
  })
}

//新增报告
export function addVpReports(params) {
  return request({
    url: '/vpReports',
    method: 'POST',
    data: params
  })
}

//Volume Pricing保存或者更新方案
export function saveOrUpdateScheme(params) {
  return request({
    url: '/vpAnalysisScheme/saveOrUpdateScheme',
    method: 'POST',
    data: params
  })
}
