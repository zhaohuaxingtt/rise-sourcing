/*
 * @Author: Hao Jiang
 * @Date: 2021-06-22 17:30:52
 * @LastEditTime: 2021-06-30 09:38:05
 * @LastEditors: Please set LastEditors
 * @Description: sel 上会复核列表部分
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_RFQ)
const longRequst = axios(process.env.VUE_APP_RFQ, 25000)

// 获取sel 复核列表
export function getSelList(params) {
  return longRequst({
      url: `/nominate/check/list`,
      method: "post",
      data: params
  })
}

// 发起复核
export function selSheetSubmit(params) {
  return requst({
      url: `/nominate/check/submit`,
      method: "post",
      data: params
  })
}

// 退回
export function batchRevoke(params) {
  return requst({
      url: `/nominate/check/send-to-draft`,
      method: "post",
      data: params
  })
}

// 退回至通过
export function batchRevokeToPass(params) {
  return requst({
      url: `/nominate/check/send-to-past`,
      method: "post",
      data: params
  })
}

// sel单确认
export function batchConfirmSelSheet(params) {
  return requst({
      url: `/nominate/sel/comfirm-batch`,
      method: "post",
      data: params
  })
}


