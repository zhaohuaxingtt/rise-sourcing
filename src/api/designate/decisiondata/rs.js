/*
 * @Author: Luoshuang
 * @Date: 2021-06-04 14:41:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-06 12:18:22
 * @Description: rs单相关接口
 * @FilePath: \front-web\src\api\designate\decisiondata\rs.js
 */
import axios from "@/utils/axios"
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_SOURCING)
const requestDownload = axiosDownload(process.env.VUE_APP_SOURCING)

// 读取报价单
export function readQuotation(params) {
  return requst({
    url: '/rs/syn-record-detail',
    method: "POST",
    data: params
  })
}

// rs单列表查询
export function getList(nominateAppId) {
  return requst({
    url: '/rs/listRs?nominateAppId='+nominateAppId,
    method: "GET"
  })
}

// 获取备注信息
export function getRemark(nominateAppId) {
  return requst({
    url: '/rs/queryRsRemarkById?nominateAppId='+nominateAppId,
    method: 'GET'
  })
}

// 修改备注
export function updateRemark(params) {
  return requst({
    url: '/rs/updateRsRemark',
    method: 'POST',
    data: params
  })
}

// 修改RS单
export function updateRS(params) {
  return requst({
    url: '/rs/update',
    method: 'POST',
    data: params
  })
}

export function exportTransformSheet(nominateAppId) {
  return requestDownload({
    url: '/rs/exportTransformSheet?nominateAppId='+nominateAppId,
    method: 'GET'
  })
}

// RS维护列表-下载模板
export function downloadRSDoc(params) {
  return requestDownload({
    url: '/rs/downLoadNomiRsDoc',
    method: 'POST',
    data: params
  })
}
// 修改RS单
export function getPrototypeList(params) {
  return requst({
    url: `/rs/queryRsSampleById/${params}`,
    method: 'GET'
  })
}

// 获取部门审批列表
export function getDepartApproval(nominateAppId) {
  return requst({
    url: `/nominate/nomi-approval-process/depart-approval/${nominateAppId}`,
    method: 'GET'
  })
}

// 获取汇率
export function searchRsPageExchangeRate(nominateId) {
  return requst({
    url: `/nominate/search-rs-page-exchange-rate/${ nominateId }`,
    method: 'POST'
  })
}