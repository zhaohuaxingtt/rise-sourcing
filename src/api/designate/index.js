/*
 * @Author: your name
 * @Date: 2021-05-28 17:30:52
 * @LastEditTime: 2021-11-06 12:09:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\designate\index.js
 */
import axios from "@/utils/axios"
import { serialize } from "@/utils"
import download from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_SOURCING)
const fileRequst = download(process.env.VUE_APP_SOURCING)

// 获取模具预算管理列表
// export function getMouldBudget(params) {
//   return requst({
//       url: `/mould-budget/${ params.currPage }/${ params.pageSize }?${ serialize(params.fsIds, Array) }&${ serialize(params.supplierIds, Array) }`,
//       method: "GET"
//   })
// }
export function getMouldBudget(data) {
  return requst({
      url: 'mould-budget/listByFsList',
      method: "POST",
      data
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

// 上会类型提交之前的校验1
export function checkNomiMeetingSubmit1(params) {
  return requst({
      url: "/nominate-apps/submit-check-tip",
      method: "GET",
      params,
  })
}
// 上会类型提交之前的校验2
export function checkNomiMeetingSubmit2(params) {
  return requst({
      url: "/nominate-apps/submit-check-part",
      method: "GET",
      params,
  })
}
// 上会类型提交之前的校验3 强校验
export function checkNomiMeetingSubmit3(params) {
  return requst({
      url: "/nominate-apps/submit-check-must",
      method: "GET",
      params,
  })
}
// 上会类型提交之前的校验4 强校验
export function checkNomiMeetingSubmit4(params) {
  return requst({
    url: "/nominate-apps/submit-check-fitting",
    method: "GET",
    params,
  })
}
export function getMeetingPage(params) {
  return requst({
      url: "/nominate-apps/meeting-page",
      method: "GET",
      params,
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

//获取定点类型
export function getNominateType() {
  return requst({
    url: '/nominate-create/get-nominate-process-type',
    method: 'GET'
  })
}

// 单一供应商下一步前保存
export function sugesstionInit(params) {
  return requst({
      url: "suggestion/init",
      method: "GET",
      params,
  })
}

// rfq零件清单下一步前保存
export function supplierInitReCord(params) {
  return requst({
      url: "/supplier/initSupplier",
      method: "GET",
      params,
  })
}

// 定点建议下一步前保存
export function sugesstionInitReCord(params) {
  return requst({
      url: "suggestion/initRecord",
      method: "GET",
      params,
  })
}


// 决策资料tablist的重置
export function tabPageLayoutsReset(nominateId) {
  return requst({
      url: `tabPageLayouts/findTabPageInitStatus?nominateId=${nominateId}`,
      method: "GET",
  })
}

// 决策资料-RS - 导出
export function rsAttachExport(params) {
  return fileRequst({
      url: "/rs/downCapacityExpRs",
      method: "GET",
      params,
  })
}

// 更新定点申请类型
export function updateNominate(data) {
  return requst({
      url: "/nominate-apps/updateNominate",
      method: "POST",
      data,
  })
}

// 提交会议结论
export function submitFlow(data) {
  return requst({
    url: "/nominate-apps/submitFlow",
    method: "POST",
    data
  })
}

// 获取会议列表
export function findMeetingPage(data) {
  return requst({
    url: "/nominate-apps/findMeetingPage",
    method: "POST",
    data
  })
}

// 配件自动定点
export function fittingNomi(params) {
  return requst({
    url: "/nominate-apps/fittingNomi",
    method: "GET",
    params,
  })
}

// 定点管理--决策资料数据权限控制接口
export function getNomiPosition(params) {
  return requst({
    url: `/nominate-apps/getNomiPosition/${ params.nomiId }`,
    method: "GET"
  })
}