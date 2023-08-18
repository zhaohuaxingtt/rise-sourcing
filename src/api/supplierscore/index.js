/*
 * @Author: your name
 * @Date: 2021-06-28 11:18:30
 * @LastEditTime: 2022-03-09 17:07:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\supplierscore\index.js
 */
import axios from "@/utils/axios"
import axiosDownload from "@/utils/axios.download"
const requst = axios(process.env.VUE_APP_SOURCING)
const requstDown = axiosDownload(process.env.VUE_APP_SOURCING)

export function findDropDownBox(params) {
  return requst({
    url: "/rfqs/findDropDownBox",
    method: "POST",
    data: params
  })
}

// 获取评分人列表
export function findRaterByCurrentUser() {
  return requst({
    url: `/rfq-bdl-ratings/findRaterByCurrentUser`,
    method: "GET"
  })
}

// 模糊查询Linie
export function findLinieByName(params, options) {
  return requst({
    url: `/rfq-bdl-ratings/findLinieByName`,
    method: "GET",
    params,
    ...options
  })
}

// 模糊查询询价采购员
export function findInquiryBuyerByName(params, options) {
  return requst({
    url: `/rfq-bdl-ratings/findInquiryBuyerByName`,
    method: "GET",
    params,
    ...options
  })
}

// 查询需要审批的部门进行打分的RFQ
export function searchRfqBdlRatings(params) {
  return requst({
    url: "/rfq-bdl-ratings/search",
    method: "POST",
    data: params
  })
}

// 转派
export function forward(params) {
  return requst({
    url: `/rfq-bdl-ratings/forward`,
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

// 提交评分
export function submitRfqBdlRatings(data) {
  return requst({
    url: '/rfq-bdl-ratings/submit',
    method: "PATCH",
    data,
  })
}

// 审核RFQ下所有评分任务
export function approveRfqBdlRatings(data) {
  return requst({
    url: '/rfq-bdl-ratings/approve',
    method: "PATCH",
    data,
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

// 获取当前登陆人的部门类型
export function findRateTagForCurrentUser() {
  return requst({
    url: `/rfq-bdl-ratings/findRateTagForCurrentUser`,
    method: "GET",
  })
}

// 获取rfq下的零件列表
export function getPartsForRfq(params) {
  return requst({
    url: `/part-for-rfq/${ params.rfqId }/${ params.pageSize }/${ params.currPage }`,
    method: "GET",
  })
}

// 撤回评分
export function recallRate(data) {
  return requst({
    url: '/rfq-bdl-ratings/recallRate',
    method: "PATCH",
    data,
  })
}

// 根据标签获取所有的部门
export function listDepartByTag(data) {
  return requst({
    url: `/rfq-rate-departs/listDepartByTag/${data.tagId}`,
    method: "POST",
  })
}
// 设置SQE评分股
export function setSqeRateDeptNum(data) {
  return requst({
    url: 'rfq-sqe-ratings/setSqeRateDeptNum',
    method: "POST",
    data,
  })
}

// SQE评分任务查询
export function search(data) {
  return requst({
    url: 'rfq-sqe-ratings/search',
    method: "POST",
    data,
  })
}

// 批准SQE评分结果
export function approve(data) {
  return requst({
    url: 'rfq-sqe-ratings/approve',
    method: "PATCH",
    data,
  })
}
// 分配SQE评分人
export function assignSqeRater(data) {
  return requst({
    url: 'rfq-sqe-ratings/assignSqeRater',
    method: "POST",
    data,
  })
}
// SQE评分退回
export function back(data) {
  return requst({
    url: 'rfq-sqe-ratings/back',
    method: "PATCH",
    data,
  })
}
// SQE评分退回
export function backByRfq(data) {
  return requst({
    url: 'rfq-sqe-ratings/backByRfq',
    method: "PATCH",
    data,
  })
}
// 导出SQE评分任务
export function exportSqeRating(data) {
  return requstDown({
    url: 'rfq-sqe-ratings/exportSqeRating',
    method: "POST",
    data,
  })
}
// 导出质量评分任务
export function exportMqRating(data) {
  return requstDown({
    url: 'rfq-sqe-ratings/exportMqRating',
    method: "POST",
    data,
  })
}
// 拒绝SQE评分结果
export function reject(data) {
  return requst({
    url: 'rfq-sqe-ratings/reject',
    method: "POST",
    data,
  })
}
// SQE评分提交
export function submit(data) {
  return requst({
    url: 'rfq-sqe-ratings/submit',
    method: "PATCH",
    data,
  })
}
// 编辑SQE评分
export function updateSqeRateBatch(data) {
  return requst({
    url: 'rfq-sqe-ratings/updateSqeRateBatch',
    method: "POST",
    data,
  })
}
// 编辑SQE审核
export function updateSeqAuditBatch(data) {
  return requst({
    url: 'rfq-sqe-ratings/updateSeqAuditBatch',
    method: "POST",
    data,
  })
}
// 根据rfqId获取RFQ详情
export function getRfqDetail(params) {
  return requst({
    url: `rfq-sqe-ratings/${params.rfqId}/detail/rate-depart`,
    method: "GET",
  })
}