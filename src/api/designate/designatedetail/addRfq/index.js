/*
 * @Author: Luoshuang
 * @Date: 2021-05-31 20:18:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-06 12:17:31
 * @Description: 
 * @FilePath: \front-web\src\api\designate\designatedetail\addRfq\index.js
 */

import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_SOURCING)

// 获取part list列表数据
export function getRfqList(params) {
  return requst({
      url: '/nominate-create/search-rfq',
      method: "POST",
      data: params
  })
}

export function selectRfq(params) {
  return requst({
    url: '/nominate-create/create-nominate',
    method: 'POST',
    data: params
  })
}
//starMonitor自动生成定点申请
export function starMonitorAutoNomi(rfqId) {
  return requst({
    url: `/auto-nomi/star-monitor/auto/${rfqId}`,
    method: 'GET',
  })
}