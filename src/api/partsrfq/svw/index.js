/*
 * @Author: your name
 * @Date: 2021-08-16 20:45:35
 * @LastEditTime: 2021-09-07 15:50:20
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\partsrfq\svw\index.js
 */

import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER_SVW)

// 总览
export function marketOverview(data) {
  return requst({
    url: '/web/aon/marketOverview/marketOverview',
    method: 'POST',
    data: data,
  })
}
// 保存总览
export function saveMarketOverview(data) {
  return requst({
    url: '/web/aon/marketOverview/marketOverviewSave',
    method: 'POST',
    data: data,
  })
}
// 保存总览
export function marketOverviewReport(data) {
  return requst({
    url: '/web/aon/marketOverview/marketOverviewReport',
    method: 'POST',
    data: data,
  })
}
