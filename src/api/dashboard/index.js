/*
 * @Author: your name
 * @Date: 2021-08-09 17:56:50
 * @LastEditTime: 2021-08-11 13:55:14
 * @LastEditors: Please set LastEditors
 * @Description: 寻源概览
 * @FilePath: /front-web/src/api/dashboard/index.js
 */

import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_RFQ)

// 获取寻源概览数据
export function sourcingOverview() {
  return requst({
    url: `/overview/sourcingOverview`,
    method: "GET",
  })
}
// 获取
export function rfqTimeOverview() {
  return requst({
    url: `/overview/rfqTimeOverview`,
    method: "GET",
  })
}

// 获取
export function powerBiService() {
  return requst({
    url: `/overview/powerBiService`,
    method: "GET",
  })
}