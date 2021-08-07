/*
 * @Author: youyuan
 * @Date: 2021-08-06 16:27:41
 * @LastEditTime: 2021-08-06 16:29:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\partsrfq\costAnalysis\index.js
 */
import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_AON)

export function getAllData(params) {
  return request({
      url: '/costStructure/page',
      method: 'POST',
      data: params
  })
}
