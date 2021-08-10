/*
 * @Author: youyuan
 * @Date: 2021-08-07 15:38:08
 * @LastEditTime: 2021-08-07 15:38:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\partsrfq\spi\index.js
 */
import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_AON)

export function getFocusSupplierList(params) {
  return request({
    url: '/spiReport/getFocusSupplierList',
    method: 'post',
    data: params
  })
}

export function getReason(params) {
  return request({
    url: '/spiReport/getReason',
    method: 'get',
    params: params
  })
}

export function getReportDetail(params) {
  return request({
      url: '/spiReport/getReportDetail',
      method: 'POST',
      data: params
  })
}

export function getInfo(params) {
  return request({
    url: '/spiReport/info',
    method: 'get',
    params: params
  })
}