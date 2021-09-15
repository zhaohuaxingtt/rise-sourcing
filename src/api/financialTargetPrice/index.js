/*
 * @Author: Luoshuang
 * @Date: 2021-06-24 15:55:46
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-15 10:01:28
 * @Description: 财务目标价相关Api
 * @FilePath: \front-web\src\api\financialTargetPrice\index.js
 */

import axios from "@/utils/axios"
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_SOURCING_ZDH)
const requstDownload = axiosDownload(process.env.VUE_APP_SOURCING_ZDH)

// 获取财务目标价列表
export function getTargetPriceList(params) {
  return requst({
    url: '/cf-target-price-applies/search',
    method: 'POST',
    data: params
  })
}

// 获取财务目标价审批列表
export function getApprovalTargetPriceList(params) {
  return requst({
    url: '/cf-target-price-applies/search-approve',
    method: 'POST',
    data: params
  })
}

// 目标价维护-设置财务目标价
export function setPrice(params) {
  return requst({
    url: '/cf-target-price-applies/setPrice',
    method: 'POST',
    data: params
  })
}

// 导入批量维护
export function importTargetPriceList(params) {
  return requst({
    url: '/cf-target-price-applies/export/import',
    method: 'POST',
    data: params
  })
}


// 导出批量维护
export function exportTargetPriceList(params) {
  return requstDownload({
    url: '/cf-target-price-applies/export/output',
    method: 'POST',
    data: params
  })
}

// 获取审批记录列表
export function getApprovalHistoryList({id, pageSize, pageNo}) {
  return requst({
    url: `/cf-target-price-applies/approve-histories/${id}/${pageNo}/${pageSize}`,
    method: 'GET'
  })
}

// 获取修改记录列表
export function getUpdateHistoryList({id, pageSize, pageNo}) {
  return requst({
    url: `/cf-target-price-applies/history-list/${id}/${pageNo}/${pageSize}`,
    method: 'GET'
  })
}

// 获取采购目标价详情
export function getTargetPriceDetail(id) {
  return requst({
    url: `/cf-target-price-applies/${id}`,
    method: 'GET'
  })
}

// 获取采购目标价详情
export function getNomiRecords(params) {
  return requst({
    url: `/cf-target-price-applies/nomi-records/search`,
    method: 'POST',
    data: params
  })
}

// 目标价查询-指派
export function appoint(params) {
  return requst({
    url: `/cf-target-price-applies/appoint`,
    method: 'POST',
    data: params
  })
}

// 申请财务目标价
export function applyCFTarget(params) {
  return requst({
    url: '/cf-target-price-applies/apply-cf-target',
    method: 'POST',
    data: params
  })
}

// 查询申请记录
export function getCfTargetApplyHistory(data) {
  return requst({
    url: `/cf-target-price-applies/apply-cf-target/list`,
    method: 'POST',
    data
  })
}

// 查询审核通过的财务目标价    零件采购项目-价格明细
export function getTargetPriceDd(fsNum) {
  return requst({
    url: `/cf-target-price-applies/getTargetPrice/${fsNum}`,
    method: 'GET'
  })
}

// 财务目标价-批准
export function targetPriceApprove(params) {
  return requst({
    url: '/cf-target-price-applies/approve',
    method: 'POST',
    data: params
  })
}

export function targetPriceCompare(id) {
  return requst({
    url: `/cf-target-price-applies/${id}/compare`,
    method: 'GET'
  })
}

export function targetPriceReject(params) {
  return requst({
    url: `/cf-target-price-applies/${params.id}/reject`,
    method: 'POST',
    data: params
  })
}

// 获取cf下拉
export function getCFList() {
  return requst({
    url: '/cf-target-price-applies/cf-user/list',
    method: 'GET'
  })
}

// 零件状态
export function getPartStatus() {
  return requst({
    url: '/cf-target-price-applies/cf-start/list',
    method: 'GET'
  })
}

// 财务目标价-价格明细保存
export function savePriceDetail(params) { 
  return requst({
    url: '/cf-target-price-applies/savePriceDetail',
    method: 'POST',
    data: params
  })
}

// 获取set属性下拉
export function getSetOptions() {
  return requst({
    url: '/cf-target-price-applies/set-kz/list',
    method: 'GET'
  })
}

// 财务目标价批量维护
export function batchSetPrice(params) {
  return requst({
    url: '/cf-target-price-applies/batch-set-price',
    method: 'POST',
    data: params
  })
}