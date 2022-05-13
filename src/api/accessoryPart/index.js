/*
 * @Author: Luoshuang
 * @Date: 2021-06-01 14:50:12
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-12-08 17:31:33
 * @Description: 配件相关接口
 * @FilePath: \front-sourcing\src\api\accessoryPart\index.js
 */

import axios from "@/utils/axios"
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_PARTS)
const requestDownload = axiosDownload(process.env.VUE_APP_PARTS)
const requstSourcing = axios(process.env.VUE_APP_SOURCING)

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
    url: '/rfq-round/rfqAutoRound',
    method: 'PATCH',
    data: params
  })
}

// 自动发起询价
export function updateRfq(params) {
  return requstSourcing({
    url: '/rfq/updateRfqInfo',
    method: 'PATCH',
    data: params
  })
}
// 根据标签获取所有的询价采购科室
export function listDepartByTag(tagId) {
  return requst({
    url: `/tp-records/accessoryInfo/listDepartByTag/${tagId}`,
    method: 'POST',
  })
}

// 获取采购员下拉
export function listUserByDepartIdAndRoleCode(data) {
  return requst({
    url: `/tp-records/accessoryInfo/listUserByDepartIdAndRoleCode/${data.deptId}/${data.roleCode}`,
    method: 'GET',
  })
}

// 根据部门id获取采购员
export function listUserByDepartId(data) {
  return requst({
    url: `/tp-records/accessoryInfo/listUserByDepartId/${ data.deptId }`,
    method: 'GET',
  })
}

// 获取所有linie部门
export function listLinieDept() {
  return requst({
    url: '/tp-records/accessoryInfo/listLinieDept',
    method: 'GET',
  })
}
// 更新询价采购员或者linie
export function updateCsfOrLinie(data) {
  console.log(data);
  return requst({
    url: '/tp-records/accessoryInfo/updateCsfOrLinie',
    method: 'PATCH',
    data
  })
}

// 配件查询相同linie、询价采购员、供应商的数据
export function getAccessoryManageListForAccessory(data) {
  return requst({
    url: '/tp-records/accessoryInfo/getAccessoryManageListForAccessory',
    method: 'POST',
    data
  })
}

// 获取文件列表带分页。
export function getFiles(params) {
  let { fileType, hostId, isAsc = true, sortColumn = 'uploadDate', page, currPage } = params
  return requst({
      url: `/file-histories/page/${hostId}/${sortColumn}/${isAsc}/${fileType}/${currPage}/${page}`,
      method: 'get'
  })
}