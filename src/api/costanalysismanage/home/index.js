/*
 * @Author: your name
 * @Date: 2021-06-03 10:40:41
 * @LastEditTime: 2021-06-04 16:06:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\costanalysismanage\home\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_RFQ)

// 获取下拉框数据
// type: 01-车型项目 02-零件项目类型  03-RFQ状态  04-轮次类型
export function getSelectOptions(type) {
  return requst({
    url: `/rfqs/findBySearches/${ type }`,
    method: 'GET'
  })
}

// 获取KM的RFQ列表
export function getKmRfqList(params) {
  return requst({
    url: '/KmRfqList',
    method: 'POST',
    data: params
  })
}

// 更新RFQ
export function updateRfq(params) {
  return requst({
      url: '/rfqs/updateRfq',
      method: 'PATCH',
      data: params
  })
}