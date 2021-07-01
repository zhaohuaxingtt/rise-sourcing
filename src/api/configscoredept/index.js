/*
 * @Author: your name
 * @Date: 2021-06-30 19:37:04
 * @LastEditTime: 2021-06-30 20:03:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\configscoredept\index.js
 */
import axios from "@/utils/axios"
const requst = axios(process.env.VUE_APP_RFQ)

// 获取部门列表
export function getRfqRateDeparts(params) {
  return requst({
    url: "/rfq-rate-departs/search",
    method: "POST",
    data: params
  })
}