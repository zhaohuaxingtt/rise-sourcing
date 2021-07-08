/*
 * @Author: haojiang
 * @Date: 2021-07-08 14:00:03
 * @LastEditTime: 2021-07-08 14:01:25
 * @LastEditors: Please set LastEditors
 * @Description: 扩产能相关接口
 * @FilePath: /front-web/src/api/designate/nomination/capacityExt.js
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_QUOTATION)

// 获取定点管理列表
export function getCapacityExtPlan(params) {
  return requst({
      url: `/getCapacityExtPlan`,
      method: "GET",
      params
  })
}