/*
 * @Author: youyuan
 * @Date: 2021-08-06 16:27:41
 * @LastEditTime: 2021-08-07 10:38:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\partsrfq\costAnalysis\index.js
 */
import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_AON)

export function getDefaultCostStructure(params) {
  return request({
    url: '/costStructure/getDefaultCostStructure',
    method: 'POST',
    data: params
  })
}

export function getAllData(params) {
  return request({
      url: '/costStructure/page',
      method: 'POST',
      data: params
  })
}
