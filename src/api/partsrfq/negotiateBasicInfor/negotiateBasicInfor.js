/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-21 15:15:44
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_AON)

export function powerBiUrl(parmars) {
  return requst({
    url: '/batchOverview/getSupplierPbi',
    method: 'GET',
  })
}
//分页查询零件采购项目列表
export function pagePart(parmars) {
  return requst({
    url: '/costAnalysisTool/part/pagePart',
    method: 'POST',
    data: parmars
  })
}
// 根据条件查询的零件采购项目列表
export function pageRfqPartPurPro(parmars) {
  return requst({
    url: '/costAnalysisTool/part/pageRfqPartPurPro',
    method: 'POST',
    data: parmars
  })
}
// 
export function getRfqSupplierRate(parmars) {
  return requst({
    url: `/costAnalysisTool/rfq/getRfqSupplierRate?rfqId=${parmars}`,
    method: 'GET',
    data: parmars
  })
}
// 
export function getRfqInfo(parmars) {
  return requst({
    url: `/costAnalysisTool/rfq/getRfqInfo?rfqId=${parmars}`,
    method: 'GET',
    data: parmars
  })
}
//材料组下拉框
export function category(parmars) {
  return requst({
    url: `/common/category`,
    method: 'POST',
    data: parmars
  })
}
