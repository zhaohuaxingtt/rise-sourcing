/*
 * @Author: Luoshuang
 * @Date: 2021-05-31 20:18:41
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-01 14:40:57
 * @Description: 
 * @FilePath: \front-web\src\api\designate\designatedetail\addRfq\index.js
 */

import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_SUPPLIER_WJS)

// 获取part list列表数据
export function getRfqList(params) {
  return requst({
      url: '/nominate-create/search-rfq',
      method: "POST",
      data: params
  })
}

// 获取下拉框数据
// type: 01-车型项目 02-零件项目类型  03-RFQ状态  04-轮次类型
export function getSelectOptions(type) {
  return requst({
    url: `/rfqs/findBySearches/${type}`,
    method: "GET"
  })
}

export function selectRfq(params) {
  return requst({
    url: '/nominate-create/create-nominate',
    method: 'POST',
    data: params
  })
}