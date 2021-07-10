/*
 * @Author: haojiang
 * @Date: 2021-07-08 14:00:03
 * @LastEditTime: 2021-07-09 17:59:00
 * @LastEditors: Please set LastEditors
 * @Description: 扩产能相关接口
 * @FilePath: /front-web/src/api/designate/nomination/capacityExt.js
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_QUOTATION)

// 报价页面获取扩产能列表
export function getQuotCapacityExtPlan(params) {
  return requst({
      url: `/part/getCapacityExtPlan/${params.quotationId}`,
      method: "GET",
      params
  })
}
// 报价页面保存扩产能列表
export function saveQuotCapacityExtPlan(data) {
  return requst({
      url: `/part/saveCapacityExtPlan`,
      method: "POST",
      data
  })
}