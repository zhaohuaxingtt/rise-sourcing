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

// 获取决策资料 - task 列表
export function getNominateTaskList(params) {
  return requst({
      url: `/nominateTask/findNominateTaskPage`,
      method: "GET",
      params
  })
}