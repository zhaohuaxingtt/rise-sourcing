/*
 * @Author: youyuan
 * @Date: 2021-06-23 10:34:48
 * @LastEditTime: 2021-06-30 16:26:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\partsrfq\vpCustomPart\index.js
 */
import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_AON)

export function getCustomPartDataList(params) {
  return request({
      url: '/vpParts/partsCustomerList',
      method: 'POST',
      data: params
  })
}

export function fetchSaveCustomPart(params) {
  return request({
      url: '/vpParts/partsCustomerList',
      method: 'PUT',
      data: params
  })
}

export function getCustomPartListByPartId(params) {
  return request({
    url: '/vpParts/partsCustomer/'+params,
    method: 'GET'
  })
}
