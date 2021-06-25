/*
 * @Author: Luoshuang
 * @Date: 2021-06-24 15:55:46
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-24 17:41:58
 * @Description: 财务目标价相关Api
 * @FilePath: \front-web\src\api\financialTargetPrice\index.js
 */

import axios from "@/utils/axios"
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_SOURCING_WDL)
const requstDownload = axiosDownload(process.env.VUE_APP_SOURCING_WDL)

// 获取财务目标价列表
export function getTargetPriceList(params) {
  return requst({
    url: '/cf-target-price-applies/search',
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