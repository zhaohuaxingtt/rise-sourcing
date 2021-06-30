/*
 * @Author: youyuan
 * @Date: 2021-06-28 10:46:03
 * @LastEditTime: 2021-06-29 19:07:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\partsrfq\bob\analysisList\index.js
 */
import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_AON)

export function getBobAnalysisDataList(params) {
  return request({
      url: '/bobAnalysisScheme/page/list',
      method: 'POST',
      data: params
  })
}

export function fetchStaick(params) {
  return request({
      url: '/bobAnalysisScheme/updateTop',
      method: 'POST',
      data: params
  })
}

export function fetchEdit(params) {
  return request({
    url: '/bobAnalysisScheme/bobAnalysisSchemeEdit',
    method: 'POST',
    data: params
  })
}

export function fetchDel(params) {
  return request({
    url: '/bobAnalysisScheme',
    method: 'DELETE',
    data: params
  })
}
