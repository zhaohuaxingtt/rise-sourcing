/*
 * @Author: Luoshuang
 * @Date: 2021-11-08 14:34:58
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2022-12-29 15:46:15
 * @Description: 模具目标价相关接口
 * @FilePath: \front-sourcing\src\api\modelTargetPrice\index.js
 */

import axios from "@/utils/axios"
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_SOURCING)
const requestDownload = axiosDownload(process.env.VUE_APP_SOURCING)

// SEL目标价 - 查询=================================================================================================================================================
// sel目标价财务查询列表
export function selCfCESearchAllPage(data) {
  return request({
    url: '/sel-target-price/selCfCESearchAllPage',
    method: 'POST',
    data
  })
}

// 目标价查询列表页面的导出
export function exportSelCfceSearch(data) {
  return requestDownload({
    url: '/sel-target-price/export-sel-cfce-search',
    method: 'POST',
    data
  })
}

// SEL目标价 - 审批=================================================================================================================================================
// sel目标价财务查询审批列表
export function selCfCESearchApprovalPage(data) {
  return request({
    url: '/sel-target-price/selCfCESearchApprovalPage',
    method: 'POST',
    data
  })
}

// 审批驳回
export function approvalReturn(data) {
  return request({
    url: '/sel-target-price/approvalReturn',
    method: 'POST',
    data
  })
}

// 审批通过 必须填写备注
export function passApprovalAndRemark(data) {
  return request({
    url: '/sel-target-price/passApprovalAndRemark',
    method: 'POST',
    data
  })
}

// 审批通过 可以不写备注
export function passApproval(data) {
  return request({
    url: '/sel-target-price/passApproval',
    method: 'POST',
    data
  })
}
// 维护和审批页面导出接口
export function exportSelCfceMaintainedApproval(data) {
  return requestDownload({
    url: '/sel-target-price/export-sel-cfce-maintained-approval',
    method: 'POST',
    data
  })
}

// SEL目标价 - 维护=================================================================================================================================================
// 签收和维护TAB页列表查询，公用
export function selCfCESearchPage(data) {
  return request({
    url: '/sel-target-price/selCfCESearchPage',
    method: 'POST',
    data
  })
}

// sel目标价维护页面导出
export function exportSelCfceMaintained(data) {
  return requestDownload({
    url: '/sel-target-price/export-sel-cfce-maintained',
    method: 'POST',
    data
  })
}

// 指派sel目标价
export function assignSelTargetPrice(data) {
  return request({
    url: '/sel-target-price/assignSelTargetPrice',
    method: 'POST',
    data
  })
}

// 目标价维护弹窗-列表导出
export function exportSelMaintainedList(data) {
  return requestDownload({
    url: '/sel-target-price/exportSelMaintainedList',
    method: 'POST',
    data
  })
}

// 目标待维护查询页面的导入接口
export function importSelCfceMaintained(data) {
  return request({
    url: '/sel-target-price/import-sel-cfce-maintained',
    method: 'POST',
    data
  })
}
// 目标价维护弹窗-批量维护导入
export function uploadSelTargetFile(data) {
  return request({
    url: '/sel-target-price/uploadSelTargetFile',
    method: 'POST',
    data
  })
}
// SEL目标价 - 签收=================================================================================================================================================

// sel单据批量确认
export function comfirmBatch(data) {
  return request({
    url: '/nominate/sel/comfirm-batch',
    method: 'POST',
    data
  })
}

// RFQ页面-sel目标价=================================================================================================================================================
// 申请sel目标价
export function applySelTargetPrice(data) {
  return request({
    url: '/sel-target-price/apply-sel-target-price-list',
    method: 'POST',
    data
  })
}


// RFQ页面导出申请sel目标价记录
export function exportSelTargetPriceTask(data) {
  return requestDownload({
    url: '/sel-target-price/export-sel-target-price-task',
    method: 'POST',
    data
  })
}


// 查询sel目标价
export function getSelTargetPriceTask(data) {
  return request({
    url: '/sel-target-price/get-sel-target-price-task',
    method: 'POST',
    data
  })
}

// 修改分摊量
export function updateSelTargetPriceReleaseOut(data) {
  return request({
    url: '/sel-target-price/update-sel-target-price-releaseOut',
    method: 'POST',
    data
  })
}


// 查询cffce用户
export function getCFECUserList(data) {
  return request({
    url: '/sel-target-price/getCFECUserList',
    method: 'POST',
    data
  })
}


// 无目标价设置
export function setNullSelTargetPrice(data) {
  return request({
    url: '/sel-target-price/setNullSelTargetPrice',
    method: 'POST',
    data
  })
}

// 签收sel目标价
export function signSelTargetPrice(data) {
  return request({
    url: '/sel-target-price/signSelTargetPrice',
    method: 'POST',
    data
  })
}

// 提交sel目标价
export function submitSelTargetPrice(data) {
  return request({
    url: '/sel-target-price/submitSelTargetPrice',
    method: 'POST',
    data
  })
}

// 转派sel目标价
export function transferSelTargetPrice(data) {
  return request({
    url: '/sel-target-price/transferSelTargetPrice',
    method: 'POST',
    data
  })
}

// 申请sel目标价记录
export function applySelTargetPriceRecordList(data) {
  return request({
    url: '/sel-target-price/apply-sel-target-price-record-list',
    method: 'POST',
    data
  })
}
// 查询SEL目标价管理维护弹窗申请记录
export function getSelTargetPriceRecordList(data) {
  return request({
    url: '/sel-target-price/get-sel-target-price-record-list',
    method: 'POST',
    data
  })
}

// 导出sel目标价申请记录
// export function exportSelTargetPriceRecordList(data) {
//   return requestDownload({
//     url: '/sel-target-price/export-sel-target-price--record-list',
//     method: 'POST',
//     data
//   })
// }

// 查询审批记录
export function getSelTargetApprovalRecord(data) {
  return request({
    url: '/sel-target-price/get-sel-target-approval-record',
    method: 'POST',
    data
  })
}