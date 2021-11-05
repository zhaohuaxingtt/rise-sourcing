/*
 * @Author: haojiang
 * @Date: 2021-06-30 10:09:30
 * @LastEditTime: 2021-11-02 21:39:31
 * @LastEditors:  
 * @Description: 签字单
 * @FilePath: /front-web/src/api/designate/nomination/signsheet.js
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_RFQ)

// 获取签字单列表
export function getSignList(params) {
  return requst({
      url: `/nominate/sign/page`,
      method: "post",
      data: params
  })
}

// 批量提交
export function batchSubmit(params) {
  return requst({
      url: `/nominate/sign/submit`,
      method: "post",
      data: params
  })
}

// 批量删除
export function batchDelete(params) {
  return requst({
      url: `/nominate/sign/delete`,
      method: "post",
      data: params
  })
}
// 签字单-查询已选择的定点申请
export function getNomiSelectedPage(params) {
  return requst({
      url: `/nominate/sign/nomi/selected-page`,
      method: "post",
      data: params
  })
}

// 签字单-查询未选择的定点申请
export function getNomiNotSelectedPage(params) {
  return requst({
      url: `/nominate/sign/nomi/non-selected-page`,
      method: "post",
      data: params,
      timeout: 25000
  })
}

// 保存签字单
export function saveSignSheet(params) {
  return requst({
      url: `/nominate/sign/save`,
      method: "post",
      data: params
  })
}
// 提交签字单
export function submitSignSheet(params) {
  return requst({
      url: `/nominate/sign/submit`,
      method: "post",
      data: params
  })
}

// 移除签字单定点申请
export function removeSignsheetItems(params) {
  return requst({
      url: `/nominate/sign/remove`,
      method: "post",
      data: params
  })
}

// 创建签字单
export function createSignSheet(params) {
  return requst({
      url: `/nominate/sign/create`,
      method: "post",
      data: params
  })
}

// 审批详情
export function signSheetApproveDetail(params) {
  return requst({
      url: `/nominate/sign/approve-detail`,
      method: "GET",
      params
  })
}

// 导出签字单
export function exportSignSheet(params) {
  return requst({
      url: `/nominate/sign/export`,
      method: "GET",
      params
  })
}

// 签字单详情查询
export function getsignSheetDetails(params) {
  return requst({
      url: `/nominate/sign/detail`,
      method: "get",
      params
  })
}