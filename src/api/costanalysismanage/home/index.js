/*
 * @Author: your name
 * @Date: 2021-06-03 10:40:41
 * @LastEditTime: 2021-06-03 10:58:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\costanalysismanage\home\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_RFQ)

// 获取KM的RFQ列表
export function getKmRfqList(params) {
  return requst({
    url: '/KmRfqList',
    method: 'POST',
    data: params
  })
}