/*
 * @Author: Luoshuang
 * @Date: 2021-11-08 14:34:58
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-09 21:22:22
 * @Description: 模具目标价相关接口
 * @FilePath: \front-sourcing\src\api\modelTargetPrice\index.js
 */

import axios from "@/utils/axios"
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_SOURCING)
const requstDownload = axiosDownload(process.env.VUE_APP_SOURCING)

// 获取目标价签收列表
export function getTargetPriceSingPage(params) {
  return requst({
    url: '/tooling-target-price-task/search-sign-page',
    method: 'POST',
    data: params
  })
}

// 获取目标价审批列表
export function getTargetPriceApprovalPage(params) {
  return requst({
    url: '/tooling-target-price-task/search-approval-page',
    method: 'POST',
    data: params
  })
}

// 获取目标价维护列表
export function getTargetPriceMaintainPage(params) {
  return requst({
    url: '/tooling-target-price-task/search-maintain-page',
    method: 'POST',
    data: params
  })
}

// 获取目标价查询列表
export function getTargetPriceSelectPage(params) {
  return requst({
    url: '/tooling-target-price-task/search-select-page',
    method: 'POST',
    data: params
  })
}

// 无投资
export function noInvestment(params) {
  return requst({
    url: '/tooling-target-price-task/no-investment',
    method: 'POST',
    data: params
  })
}

// 签收
export function taskSign(params) {
  return requst({
    url: '/tooling-target-price-task/sign',
    method: 'POST',
    data: params
  })
}

// 审批记录列表
export function getApprovalPage(taskId, params) {
  return requst({
    url: `/tooling-target-price-task/search-approval-recode-page/${taskId}`,
    method: 'POST',
    data: params
  })
}

// 指派
export function appoint(params) {
  return requst({
    url: '/tooling-target-price-task/appoint',
    method: 'POST',
    data: params
  })
}

// 修改记录列表
export function getRecordList(rfqId, params) {
  return requst({
    url: `/tooling-target-price-task/search-recode-list/${rfqId}`,
    method: 'POST',
    data: params
  })
}

// 获取申请目标价列表(签收、维护、审批、详情)
export function getTaskPartList(taskId) {
  return requst({
    url: `/tooling-target-price-task/search-task-part-list/${taskId}`,
    method: 'GET'
  })
}

// 获取RFQ中的零件-申请目标价列表查询
export function getTaskPartListRfq(rfqId) {
  return requst({
    url: `/tooling-target-price-task/search-rfq-part-list/${rfqId}`,
    method: 'GET'
  })
}

// 目标价申请提交
export function submitApplyTargetPrice(params) {
  return requst({
    url: 'tooling-target-price-task/submit-apply',
    method: 'POST',
    data: params
  })
}

// 保存目标价维护
export function saveMaintain(params) {
  return requst({
    url: '/tooling-target-price-task/save-maintaining',
    method: 'POST',
    data: params
  })
}

// 提交目标价维护
export function submitMaintain(params) {
  return requst({
    url: '/tooling-target-price-task/submit-maintaining',
    method: 'POST',
    data: params
  })
}

// 审批
export function approve(params) {
  return requst({
    url: '/tooling-target-price-task/approval',
    method: 'POST',
    data: params
  })
}

// 拒绝
export function reject(params) {
  return requst({
    url: '/tooling-target-price-task/reject',
    method: 'POST',
    data: params
  })
}

// 获取指派人列表
export function getAppointUser() {
  return requst({
    url: '/tooling-target-price-task/search-appoint-user',
    method: 'GET'
  })
}

// 导出批量维护
export function exportBatchMaintain(params) {
  return requstDownload({
    url: '/tooling-target-price-task/export-batch-maintain',
    method: 'POST',
    data: params
  })
}

// 导入批量维护
export function importBatchMaintain(params) {
  return requst({
    url: '/tooling-target-price-task/import-batch-maintain',
    method: 'POST',
    data: params
  })
}

// 审批列表导出
export function exportApproval(params) {
  return requstDownload({
    url: '/tooling-target-price-task/export-approval',
    method: 'POST',
    data: params
  })
}


// 目标价列表导出
export function exportTargetPrice(params) {
  return requstDownload({
    url: '/tooling-target-price-task/export-target-price',
    method: 'POST',
    data: params
  })
}