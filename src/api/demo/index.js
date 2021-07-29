/*
 * @Author: your name
 * @Date: 2021-07-29 09:57:16
 * @LastEditTime: 2021-07-29 09:58:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\demo\index.js
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_PROCUREMENTREQUIREMENT_ZZB)

export function getCityInfo(data) {
  return requst({
    url: '/baseInfo/api/cityInfo',
    method: 'GET',
    params: data,
  })
}
