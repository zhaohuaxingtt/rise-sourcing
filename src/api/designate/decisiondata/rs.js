/*
 * @Author: Luoshuang
 * @Date: 2021-06-04 14:41:32
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-02 17:42:41
 * @Description: rs单相关接口
 * @FilePath: \front-web\src\api\designate\decisiondata\rs.js
 */
import axios from "@/utils/axios"
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_SUPPLIER_WJS)
const requestDownload = axiosDownload(process.env.VUE_APP_SOURCING_MH)

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
    url: '/rs/list?nominateAppId='+nominateAppId,
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
    url: 'https://www.fastmock.site/mock/5cd3e97d6126b18b5e16f3e499489335/api/prototypeList',
    method: 'GET',
    data: params
  })
}

// 获取部门审批列表
export function getDepartApproval(nominateAppId) {
  return requst({
    url: `http://192.168.50.50:9029/sourcing/web/nominate/nomi-approval-process/depart-approval/${nominateAppId}`,
    method: 'GET'
  })
}