/*
 * @Author: your name
 * @Date: 2021-08-09 17:56:50
 * @LastEditTime: 2021-08-15 13:09:42
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
// 获取状态跟踪详情
export function rfqTimeOverview(data) {
  return requst({
    url: `/overview/rfqTimeOverview`,
    method: "POST",
    data
  })
}

// 获取获取状态跟踪报表
export function powerBiService() {
  return requst({
    url: `/overview/powerBiService`,
    method: "GET",
  })
}

// 获取状态跟踪详情筛选条件
export function findBySearchesList(data) {
  return requst({
    url: `/rfqs/findBySearchesList`,
    method: "POST",
    data
  })
}

// 获取状态跟踪详情筛选条件
export function overviewRemark(data) {
  return requst({
    url: `/overview/remark`,
    method: "POST",
    data
  })
}