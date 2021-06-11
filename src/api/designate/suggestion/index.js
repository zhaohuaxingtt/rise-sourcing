/*
 * @Author: haojiang
 * @Date: 2021-05-28 17:30:52
 * @LastEditTime: 2021-06-03 11:12:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_NEGO)

// 获取业务分配模拟列表
export function getSimulateRecord(params) {
  return requst({
      url: `/nego-assistant/allocation-simulate-record/${params.rfqId}`,
      method: "GET"
  })
}

// 获取业务分配模拟列表
export function getNomiSimulateRecord(params) {
  return requst({
      url: `/nego-assistant/nomi-simulate-record/${params.rfqId}`,
      method: "GET"
  })
}

// 组合
export function setSummaryGroup(data) {
  return requst({
      url: `/nego-assistant/nego-analysis-summary-group`,
      method: "POST",
      data
  })
}

// 取消组合
export function cancelSummaryGroup(data) {
  return requst({
      url: `/nego-assistant/nego-analysis-summary-group`,
      method: "DELETE",
      data
  })
}

// 刷新
export function refreshSimulateRecord(params) {
  return requst({
      url: `/nego-assistant/allocation-simulate-record-refresh/${params.rfqId}`,
      method: "GET"
  })
}

// 保存
export function saveSimulateRecord(data) {
  return requst({
      url: `/nego-assistant/allocation-simulate-record-save`,
      method: "POST",
      data
  })
}