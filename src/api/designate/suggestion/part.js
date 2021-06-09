/*
 * @Author: haojiang
 * @Date: 2021-05-28 17:30:52
 * @LastEditTime: 2021-06-03 11:12:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_RFQ)

// 获取零件列表
export function getSuggestionList(params) {
  return requst({
      url: `/suggestion/list`,
      method: "GET",
      params
  })
}

// 获取零件供应商列表
export function getPartSupplierList(data) {
  return requst({
      url: `/rs/suppliers`,
      method: "POST",
      data
  })
}

// 定点建议更新
export function updateSuggestion(data) {
  return requst({
      url: `/suggestion/update`,
      method: "POST",
      data
  })
}

// 定点建议删除
export function deleteSuggestion(data) {
  return requst({
      url: `/suggestion/delete`,
      method: "POST",
      data
  })
}