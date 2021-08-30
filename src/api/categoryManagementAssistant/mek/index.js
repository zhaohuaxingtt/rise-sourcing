/*
 * @Author: your name
 * @Date: 2021-08-06 15:34:45
 * @LastEditTime: 2021-08-24 18:02:50
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
//市场数据原材料下拉列表
export function saveMekTable(params) {
  return request({
    url: '/mekRemark/save',
    method: 'POST',
    data: params,
  })
}
//市场数据原材料下拉列表
export function deleteMekTable(params) {
  return request({
    url: '/mekRemark/delete',
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
export function getComparedMotor(params) {
  return request({
    url: '/mekScheme/getComparedMotor',
    method: 'POST',
    data: params,
  })
}
//获取目标车型/内部进入时，基于rfq获取目标车型；外部进入时，基于材料组获取目标车型
export function getTargetMotor(params) {
  return request({
    url: '/mekScheme/getTargetMotor',
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
    url: '/mekScheme/recursiveRetrieve',
    method: 'POST',
    data: params,
  })
}
//查询计算车型
export function queryCal(params) {
  return request({
    url: '/mekScheme/queryCal',
    method: 'POST',
    data: params,
  })
}
//点击单根柱状图，查询零件EBR信息
export function queryPartEbr(params) {
  return request({
    url: '/mekScheme/queryPartEbr',
    method: 'POST',
    data: params,
  })
}
//更新MEK分析方案详情
export function updateScheme(params) {
  return request({
    url: '/mekScheme/updateScheme',
    method: 'POST',
    data: params,
  })
}
