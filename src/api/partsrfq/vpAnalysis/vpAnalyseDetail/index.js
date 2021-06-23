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
