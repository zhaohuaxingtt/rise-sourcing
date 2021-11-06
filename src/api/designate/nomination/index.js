/*
 * @Author: your name
 * @Date: 2021-05-28 17:30:52
 * @LastEditTime: 2021-08-09 16:46:25
 * @LastEditors: Luoshuang
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\designate\nomination\index.js
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_SOURCING)

// 获取定点管理列表
export function getNominationList(params) {
  return requst({
      url: `/nominate-apps/page`,
      method: "post",
      data: params
  })
}

// 批量撤回
export function batchRevoke(data) {
  return requst({
    url: `/nominate-apps/recall`,
    method: "post",
    data
})
}

// 批量删除
export function batchDelete(data) {
  return requst({
    url: `/nominate-apps/delete`,
    method: "post",
    data
})
}

// 导出
export function nominatExport(data) {
  return requst({
    url: `/nominate-apps/export`,
    method: "post",
    data
})
}

// 提交
export function nominatSubmit(data) {
  return requst({
    url: `/nominate-apps/submit`,
    method: "post",
    data
})
}

// 冻结
export function nominateRreeze(data) {
  return requst({
    url: '/nominate-apps/freeze',
    method: "post",
    data
  })
}

// 解冻
export function nominateUnRreeze(data) {
  return requst({
    url: '/nominate-apps/unfreeze',
    method: "post",
    data
  })
}

// 冻结
export function rsFrozen(data) {
  return requst({
    url: '/rs/frozen',
    method: "POST",
    data
  })
}

// 解冻
export function rsUnFrozen(data) {
  return requst({
    url: '/rs/unfreeze',
    method: "POST",
    data
  })
}

// 定点确认
export function nominateConfirm(data) {
  return requst({
    url: '/nominate-apps/nominate',
    method: "post",
    data
  })
}

// 获取车型项目
// export function getCarTypePro(data) {
//   return requst({
//     url: '/part-src-prjs/car-type-pro',
//     method: "GET"
//   })
// }

// 提交一致性校验
export function consistenceCheck(data) {
  return requst({
    url: "/nominate-apps/consistence-check",
    method: "POST",
    data,
  })
}

// 会外流转
export function nomiApprovalProcess(data) {
  return requst({
    url: "/nominate/nomi-approval-process/submitApproval",
    method: "POST",
    data,
  })
}

