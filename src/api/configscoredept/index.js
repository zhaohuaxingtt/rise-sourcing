/*
 * @Author: your name
 * @Date: 2021-06-30 19:37:04
 * @LastEditTime: 2021-07-20 14:43:47
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
export function saveRfqRateDeparts(data) {
  return requst({
    url: `/rfq-rate-departs/batch-update?rfqId=${ data.rfqId || 'null' }`,
    method: "PATCH",
    data: data.data
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

// 获取评分部门类型
export function getAllDeptTag() {
  return requst({
    url: "/rfq-rate-departs/getAllDeptTag",
    method: "GET"
  })
}

// 获取评分人和协调人列表
export function getAllRaterAndCoordinator(params) {
  return requst({
    url: `/rfq-rate-departs/getAllRaterAndCoordinator/${ params.rateTag }/${ params.rateDepartNum }`,
    method: "GET"
  })
}