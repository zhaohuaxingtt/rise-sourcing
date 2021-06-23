/*
 * @Author: youyuan
 * @Date: 2021-06-23 10:34:48
 * @LastEditTime: 2021-06-23 10:37:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\partsrfq\vpCustomPart\index.js
 */
import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_VP_ANALYSE)

export function getCustomPartDataList(params) {
  return request({
      url: '/vpParts/partsCustomerList',
      method: 'POST',
      data: params
  })
}