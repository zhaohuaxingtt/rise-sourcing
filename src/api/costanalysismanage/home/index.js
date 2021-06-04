/*
 * @Author: your name
 * @Date: 2021-06-03 10:40:41
 * @LastEditTime: 2021-06-03 15:58:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\costanalysismanage\home\index.js
 */
import axios from '@/utils/axios'
// const partsRequst = axios(process.env.VUE_APP_PARTS)
const rfqRequst = axios(process.env.VUE_APP_RFQ)

// 获取下拉框数据
// type: 01-车型项目 02-零件项目类型  03-RFQ状态  04-轮次类型
// export function getSelectOptions(type) {
//   return partsRequst({
//     url: `/rfqs/findBySearches/${ type }`,
//     method: 'GET'
//   })
// }

// 获取KM的RFQ列表
export function getKmRfqList(params) {
  return rfqRequst({
    url: '/KmRfqList',
    method: 'POST',
    data: params
  })
}