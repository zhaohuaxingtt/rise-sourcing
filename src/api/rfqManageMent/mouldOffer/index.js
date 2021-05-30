/*
 * @Author: your name
 * @Date: 2021-04-21 16:39:36
 * @LastEditTime: 2021-05-07 19:03:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-supplier\src\api\rfqManageMent\mouldOffer\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SUPPLIER_ECHARTS)

/**
 * @description: 待办rfq供应商列表
 * @param {*} parmars
 * @return {*}
 */
 export function quotations(params) {
  return requst({
      url: '/part-quotation',
      method: 'POST',
      data: params
  })
}
export function supplierPart(params) {
  return requst({
    url: '/supplier-part-lists',
    method: 'POST',
    data: params
  })
}