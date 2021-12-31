/*
 * @Author: wentliao
 * @Date: 2021-12-31 11:06:37
 * @Description: 评分部门设置
 */
import axios from "@/utils/axios"
const requst = axios(process.env.VUE_APP_SOURCING)

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
    url: `/rfq-rate-departs/batch-update${ data.rfqId ? '?rfqId=' + data.rfqId : '' }`,
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

// 分页获取所有部门列表
export function getAllDeptByPage(data) {
  return requst({
    url: "/rfq-rate-departs/getDept",
    method: "POST",
    data
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