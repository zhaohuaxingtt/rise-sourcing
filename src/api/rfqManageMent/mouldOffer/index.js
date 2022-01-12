/*
 * @Author: your name
 * @Date: 2021-04-21 16:39:36
 * @LastEditTime: 2022-01-11 16:40:33
 * @LastEditors: caopeng
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing-new\src\api\rfqManageMent\mouldOffer\index.js
 */
import axios from '@/utils/axios'
import downLoadAxons from '@/utils/axios.download'
const requst = axios(process.env.VUE_APP_SOURCING)
const downLoad = downLoadAxons(process.env.VUE_APP_SOURCING)
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
    url: '/quotation/supplier-part-lists',
    method: 'POST',
    data: params
  })
}
export function findRfqInfoList(rfqId) {
  return requst({
    url: `/findRfqInfoList/${rfqId}`,
    method: 'GET'
  })
}
export function downLoadExcel(data) {
  return downLoad({
    url: `/download-price-trend`,
    method: 'post',
    data:data
  })
}
export function downLoadExcelTwo(data) {
    return requst({
      url: `/download-price-trend`,
      method: 'post',
      data:data
    })
  }
// 根据供应商查询零件和轮次列表
export function rfqQueryLinkage(data) {
  return requst({
    url: `/rfqQueryLinkage`,
    method: 'post',
    data:data
  })
}
