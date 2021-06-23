/*
 * @Author: moxuan
 * @Description: pca总览
 */

import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_VP_ANALYSE)

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
