/*
 * @Author: your name
 * @Date: 2021-08-09 17:56:50
 * @LastEditTime: 2021-08-09 17:57:46
 * @LastEditors: Please set LastEditors
 * @Description: 寻源概览
 * @FilePath: /front-web/src/api/dashboard/index.js
 */

import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_SOURCING_ZDH)

// 获取审批节点列表
export function sourcingOverview() {
  return requst({
    url: `/overview/sourcingOverview`,
    method: "GET",
  })
}