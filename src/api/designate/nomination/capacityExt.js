/*
 * @Author: haojiang
 * @Date: 2021-07-08 14:00:03
 * @LastEditTime: 2021-11-06 12:15:31
 * @LastEditors: Please set LastEditors
 * @Description: 扩产能相关接口
 * @FilePath: /front-web/src/api/designate/nomination/capacityExt.js
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_SOURCING)
const quRequest = axios(process.env.VUE_APP_SOURCING)

// 获取扩产能列表
export function getCapacityExtPlan(params) {
  return requst({
      url: `/rs/list/${params.nominateId}`,
      method: "GET",
      params
  })
}

// 报价页面获取扩产能列表
export function getQuotCapacityExtPlan(params) {
  return quRequest({
      url: `/part/getCapacityExtPlan/${params.quotationId}`,
      method: "GET",
      params
  })
}
// 报价页面保存扩产能列表
export function saveQuotCapacityExtPlan(data) {
  return quRequest({
      url: `/part/saveCapacityExtPlan`,
      method: "POST",
      data
  })
}