/*
 * @Author: your name
 * @Date: 2021-05-28 17:30:52
 * @LastEditTime: 2021-06-01 11:06:44
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

// 定点管理-提交
export function nominateAppSsubmit(data) {
  return requst({
      url: "/nominate-apps/submit",
      method: "POST",
      data,
  })
}

// 定点管理-导出
export function nominateAppSExport(data) {
  return requst({
      url: "/nominate-apps/export",
      method: "POST",
      data,
  })
}

// 定点管理详情
export function nominateAppSDetail(params) {
  return requst({
      url: "/nominate-apps/detail",
      method: "GET",
      params,
  })
}

// 更新决策资料 - 三级菜单排序
export function updateTabPageManager(data) {
  return requst({
    url: "/tabPageLayouts/updateTabPageManager",
    method: "POST",
    data,
})
}
