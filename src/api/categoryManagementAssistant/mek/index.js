/*
 * @Author: your name
 * @Date: 2021-08-06 15:34:45
 * @LastEditTime: 2021-08-12 19:37:46
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
//材料组下拉框
export function category(params) {
  return request({
    url: '/common/category',
    method: 'POST',
    data: params,
  })
}
//基于材料组获取对标车型信息
export function getMotor(params) {
  return request({
    url: '/mekScheme/getMotor',
    method: 'POST',
    data: params,
  })
}
//进入详情页面时，根据方案ID查询mek方案信息
export function getSchemeInfo(params) {
  return request({
    url: '/mekScheme/getSchemeInfo',
    method: 'POST',
    data: params,
  })
}
//根据车型信息获取对应的零件六位号
export function recursiveRetrieve(params) {
  return request({
    url: '/web/aon/mekScheme/recursiveRetrieve',
    method: 'POST',
    data: params,
  })
}
