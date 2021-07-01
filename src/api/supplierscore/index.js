/*
 * @Author: your name
 * @Date: 2021-06-28 11:18:30
 * @LastEditTime: 2021-06-30 15:49:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\supplierscore\index.js
 */
import axios from "@/utils/axios"
const requst = axios(process.env.VUE_APP_RFQ)

// 查询需要审批的部门进行打分的RFQ
export function searchRfqBdlRatings(params) {
  return requst({
    url: "/rfq-bdl-ratings/search",
    method: "POST",
    data: params
  })
}

// 获取RFQ详情（仅限当前登录部门）
export function getRfqDetailByCurrentDept(params) {
  return requst({
    url: `/rfq-bdl-ratings/${ params.rfqId }/detail/rate-depart`,
    method: "GET"
  })
}

// 获取供应商评分列表（仅限当前登录部门）
export function getRfqBdlRatingsByCurrentDept(params) {
  return requst({
    url: `/rfq-bdl-ratings/${ params.rfqId }/list`,
    method: "GET"
  })
}

// 退回至采购员
export function backRfqBdlRatings(params) {
  return requst({
    url: `/rfq-bdl-ratings/${ params.rfqId }/back`,
    method: "PATCH"
  })
}

// 审核RFQ下所有评分任务
export function approveRfqBdlRatings(params) {
  return requst({
    url: `/rfq-bdl-ratings/${ params.rfqId }/approve`,
    method: "PATCH"
  })
}

// 拒绝RFQ下所有评分任务
export function rejectRfqBdlRatings(params) {
  return requst({
    url: `/rfq-bdl-ratings/reject`,
    method: "POST",
    data: params
  })
}

// 修改供应商评分备注
export function updateRfqBdlRatingMemo(params) {
  return requst({
    url: `/rfq-bdl-ratings/memo`,
    method: "POST",
    data: params
  })
}

// 保存供应商评分
export function updateRfqBdlRatings(params) {
  return requst({
    url: `/rfq-bdl-ratings/batch-update`,
    method: "PATCH",
    data: params
  })
}

// 获取零件评分列表（仅限当前登录部门）
export function getRfqPartRatingsByCurrentDept(params) {
  return requst({
    url: `/rfq-part-ratings/${ params.rfqId }/${ params.supplierId }/list`,
    method: "GET"
  })
}

// 保存零件评分
export function updateRfqPartRatings(params) {
  return requst({
    url: `/rfq-part-ratings/batch-update`,
    method: "PATCH",
    data: params
  })
}

// 修改零件评分备注
export function updateRfqPartRatingMemo(params) {
  return requst({
    url: `/rfq-part-ratings/memo`,
    method: "POST",
    data: params
  })
}