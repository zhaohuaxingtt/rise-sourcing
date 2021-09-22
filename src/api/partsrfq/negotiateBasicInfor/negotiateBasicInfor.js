/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-21 15:15:44
 * @LastEditors: zbin
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
export function getOneRfqInfo(parmars) {
  return requst({
    url: `/costAnalysisTool/rfq/getOneRfqInfo?rfqId=${parmars}`,
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
//备注select
export function getRfqToRemark(parmars) {
  return requst({
    url: `/rfqToRemarkEntity/getRfqToRemark?rfqCode=${parmars}`,
    method: 'GET',
    data: parmars
  })
}
//备注save
export function modifyRfqToRemark(parmars) {
  return requst({
    url: `/rfqToRemarkEntity/modifyRfqToRemark`,
    method: 'POST',
    data: parmars
  })
}
//map
export function overviewBatchSupplierMap(parmars) {
  return requst({
    url: `/batchOverview/overviewBatchSupplierMap`,
    method: 'POST',
    data: parmars
  })
}
//定点记录
export function listFixedPointHistory(parmars) {
  return requst({
    url: `/costAnalysisTool/rfq/listFixedPointHistory`,
    method: 'POST',
    data: parmars
  })
}
//材料组/供应商--列表
export function getRfqSupplierAndCategory(parmars) {
  return requst({
    url: `/costAnalysisTool/rfq/getRfqSupplierAndCategory?rfqId=${parmars}`,
    method: 'GET',
    data: parmars
  })
}
//材料组/供应商--列表
export function saveOverviewSupplierBatchReport(parmars) {
  return requst({
    url: `categoryReport/saveOverviewSupplierBatchReport`,
    method: 'POST',
    data: parmars
  })
}
