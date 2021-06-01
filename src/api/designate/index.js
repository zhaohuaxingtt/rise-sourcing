/*
 * @Author: your name
 * @Date: 2021-05-28 17:30:52
 * @LastEditTime: 2021-05-31 21:08:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\designate\index.js
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_RFQ)

// 获取模具预算管理列表
export function getMouldBudget(params) {
  return requst({
      url: `/mould-budget/${ params.currPage }/${ params.pageSize }`,
      method: "GET",
      params: params
  })
}

// 提交/撤回 模具预算
export function patchMouldBudget(params) {
  return requst({
      url: "/mould-budget",
      method: "PATCH",
      data: params
  })
}


// 获取步骤栏状态
export function findFrontPageSeat(params) {
  return requst({
      url: "/page-history/find-front-page-seat",
      method: "GET",
      params,
  })
}

// 更新步骤栏的状态
export function updatePresenPageSeat(data) {
  return requst({
      url: "/page-history/update-presen-page-seat",
      method: "POST",
      data,
  })
}

