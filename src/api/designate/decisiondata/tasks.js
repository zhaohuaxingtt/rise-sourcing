/*
 * @Author: your name
 * @Date: 2021-05-28 17:30:52
 * @LastEditTime: 2021-05-28 20:07:52
 * @LastEditors: Please set LastEditors
 * @Description: 决策资料api - task
 * @FilePath: \front-web\src\api\designate\index.js
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_RFQ)

// 增加背景目标信息
export function addBackgroundAndObjectiveInfo(data) {
  return requst({
      url: `/nominateTask/addBackgroundAndObjectiveInfo`,
      method: "POST",
      data
  })
}
// 获取背景目标信息
export function getBackgroundAndObjectiveInfo(params) {
  return requst({
      url: `/nominateTask/findBackgroundAndObjectiveInfo`,
      method: "GET",
      params
  })
}

// 获取决策资料 - task 列表
export function getNominateTaskList(params) {
  return requst({
      url: `/nominateTask/findNominateTaskPage`,
      method: "GET",
      params
  })
}

// 获取决策资料 - 新增task
export function addNominateTask(data) {
  return requst({
      url: `/nominateTask/addNominateTask`,
      method: "POST",
      data
  })
}

// 获取决策资料 - 删除task
export function deleteNominateTask(data) {
  return requst({
      url: `/nominateTask/delNominateTask`,
      method: "POST",
      data
  })
}