/*
 * @Author: wentliao
 * @Date: 2021-09-01 11:04:35
 * @Description: 报价单相关接口
 */


import router from '../../../router/index'
const supplierId = ()=> router.currentRoute.query.supplierId?router.currentRoute.query.supplierId:''

import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_RFQ)


export function bnkSupplierToken(params) {
  return requst({
    url: '/part/bnkSupplierToken',
    method: 'GET',
    params,
  })
}
 
// 获取报价单详情 
export function getQuotationInfo(quotationId) {
  return requst({
    url: `/aeko/get/part-info/${quotationId}`,
    method: 'GET',
  })
}

// 终止费-保存
export function saveTerminationPrice(data) {
  return requst({
    url: `/part/terminationPrice?supplierId=${supplierId()}&quotationId=${data.quotationId}`,
    method: 'POST',
    data,
  })
}