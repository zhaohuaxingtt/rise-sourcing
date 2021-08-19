/*
 * @Author: Luoshuang
 * @Date: 2021-06-01 14:50:12
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-19 09:49:15
 * @Description: 配件相关接口
 * @FilePath: \front-web\src\api\accessoryPart\index.js
 */

import axios from "@/utils/axios"
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_PROCUREMENTREQUIREMENT_ZZB)
const requestDownload = axiosDownload(process.env.VUE_APP_PROCUREMENTREQUIREMENT_ZZB)
const requstSourcing = axios(process.env.VUE_APP_SOURCING_WDL)

// 获取配件列表数据
export function getAccessoryOneInfoList(params) {
  return requst({
    url: '/tp-records/accessoryInfo/getAccessoryOneInfoList/',
    method: "POST",
    data: params
  })
}

// 获取配件管理列表数据
export function getAccessoryManageList(params) {
  return requst({
    url: '/tp-records/accessoryInfo/getAccessoryManageList',
    method: "POST",
    data: params
  })
}

// 获取下拉框数据
// type: 01-车型项目 02-零件项目类型  03-RFQ状态  04-轮次类型
export function getSelectOptions(type) {
  return requst({
    url: `/rfqs/findBySearches/${type}`,
    method: "GET"
  })
}

// 获取配件信息详情
export function getAccessoryOneInfo(spNum) {
  return requst({
    url: `/tp-records/accessoryInfo/getAccessoryOneInfo/${spNum}`,
    method: 'GET'
  })
}

// 签收配件信息单
export function signAccessoryInfo(params) {
  return requst({
    url: '/tp-records/accessoryInfo/getAccessoryInfo',
    method: 'PATCH',
    data: params
  })
}

// 分配配件信息单
export function sendAccessoryInfo(params) {
  return requst({
    url: '/tp-records/accessoryInfo/sendAccessoryInfo',
    method: 'PATCH',
    data: params
  })
}

// 获取部门下拉 tag- LINIE:4   询价：9
export function getDeptList({tag}) {
  return requst({
    url: `/tp-records/accessoryInfo/findRespDept/${tag}`,
    method: 'POST',
  })
}

// 获取采购员下拉
export function getUserList({deptId, tag}) {
  return requst({
    url: `/tp-records/accessoryInfo/findRespLinie/${tag}/${deptId}`,
    method: 'GET'
  })
}

// 导出
export function downLoadAccessoryList(params) {
  return requestDownload({
    url: '/tp-records/accessoryInfo/downloadAccessoryList/',
    method: 'POST',
    data: params
  })
}

export function downloadManageList(params) {
  return requestDownload({
    url: '/tp-records/accessoryInfo/downloadManageList',
    method: 'POST',
    data: params
  })
}

// 退回EPS
export function backEPS(params) {
  return requst({
    url: `/tp-records/accessoryInfo/backAccessoryToEps`,
    method: 'PATCH',
    data: params
  })
}

// 退回
export function back(params) {
  return requst({
    url: `/tp-records/accessoryInfo/backAccessoryInfo`,
    method: 'PATCH',
    data: params
  })
}

// 下载全部配件信息
export function downLoadAccessoryAll() {
  return requestDownload({
    url: '/tp-records/accessoryInfo/downloadAccessoryAll',
    method: 'GET',
  })
}

// 新增rfq
export function insertRfq(params) {
  return requstSourcing({
    url: '/rfqs/insertRfq',
    method: 'PATCH',
    data: params
  })
}

// 根据sp号查询零件信息
export function getPartBySP(params) {
  return requstSourcing({
    url: '/purchasing-project-parts/findAccessoryAffixProjects',
    method: 'POST',
    data: params
  })
}

// 自动发起询价
export function autoInquiry(params) {
  return requstSourcing({
    url: '/rfqs/rfqAutoRound',
    method: 'PATCH',
    data: params
  })
}

// 自动发起询价
export function updateRfq(params) {
  return requstSourcing({
    url: '/rfqs/updateRfq',
    method: 'PATCH',
    data: params
  })
}
