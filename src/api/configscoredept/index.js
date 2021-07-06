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

// 获取评分部门列表
export function getRfqRateDeparts(params) {
  return requst({
    url: "/rfq-rate-departs/search",
    method: "POST",
    data: params
  })
}

// 保存评分部门列表
export function saveRfqRateDeparts(params) {
  return requst({
    url: "/rfq-rate-departs/batch-update",
    method: "PATCH",
    data: params
  })
}

// 删除评分部门列表
export function deleteRfqRateDeparts(params) {
  return requst({
    url: "/rfq-rate-departs/delete",
    method: "DELETE",
    data: params
  })
}

// 获取所有部门列表
export function getAllDept(params) {
  return requst({
    url: "/rfq-rate-departs/getAllDept",
    method: "POST",
    data: params
  })
}