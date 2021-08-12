/*
 * @Author: your name
 * @Date: 2021-08-06 15:34:45
 * @LastEditTime: 2021-08-11 17:20:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\categoryManagementAssistant\mek\index.js
 */
import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_AON)

//市场数据原材料下拉列表
export function getMekTable(params) {
  return request({
    url: '/mekRemark/get',
    method: 'POST',
    data: params,
  })
}
//获取mek分析柱状图详情
export function getHistogram(params) {
  return request({
    url: '/mekScheme/mek',
    method: 'POST',
    data: params,
  })
}
