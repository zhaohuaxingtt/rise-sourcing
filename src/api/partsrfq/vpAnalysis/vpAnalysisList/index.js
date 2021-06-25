/*
 * @Author: youyuan
 * @Date: 2021-06-22 11:23:31
 * @LastEditTime: 2021-06-24 14:15:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\partsrfq\vpAnalysis\vpAnalysisList\index.js
 */

import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_AON)

export function getVpAnalysisDataList(params) {
  return request({
      url: '/vpAnalysisScheme/page',
      method: 'POST',
      data: params
  })
}

export function fetchStaick(params) {
  return request({
      url: '/vpAnalysisScheme/stick',
      method: 'PUT',
      data: params
  })
}

export function fetchEdit(params) {
  return request({
    url: '/vpAnalysisScheme/updateVp',
    method: 'PUT',
    data: params
  })
}

export function fetchDel(params) {
  return request({
    url: '/vpAnalysisScheme/removeVpScheme',
    method: 'POST',
    data: params
  })
}
