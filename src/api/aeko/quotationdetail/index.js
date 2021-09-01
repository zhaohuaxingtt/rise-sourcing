/*
 * @Author: wentliao
 * @Date: 2021-09-01 11:04:35
 * @Description: 报价单相关接口
 */


import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_RFQ)

export function bnkSupplierToken(params) {
  return requst({
    url: '/part//bnkSupplierToken',
    method: 'GET',
    params,
  })
}

// 获取CBD调整部分下拉列表
export function getAekoCarDosage(params) {
  return requst({
    url: `/aeko/cbd-select/${ params.quotationId }`,
    method: 'GET',
  })
}