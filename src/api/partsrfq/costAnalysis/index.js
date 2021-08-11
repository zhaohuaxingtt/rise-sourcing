/*
 * @Author: youyuan
 * @Date: 2021-08-06 16:27:41
 * @LastEditTime: 2021-08-10 15:13:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\partsrfq\costAnalysis\index.js
 */
import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_AON)

//获取默认Cost Structure分析信息
export function getDefaultCostStructure(params) {
  return request({
    url: '/costStructure/getDefaultCostStructure',
    method: 'POST',
    data: params
  })
}

//获取分析报告详情
export function getCostStructureAnalysis() {

}

//获取当前登录用户对应的材料组数据
export function getMaterialGroupByUserIds(params) {
  return request({
    url: '/costStructure/getMaterialGroupByUserIds',
    method: 'POST',
    data: params
  })
}

//获取cbd
export function getTotalCbdData(params) {
  return request({
    url: '/costStructure/getTotalCbdData',
    method: 'POST',
    data: params
  })
}

//获取定点历史记录
export function listNomiData(params) {
  return request({
    url: '/costStructure/listNomiData',
    method: 'POST',
    data: params
  })
}

//分页查询
export function getAnalysisList(params) {
  return request({
      url: '/costStructure/page',
      method: 'POST',
      data: params
  })
}

//保存
export function fetchSave() {
  
}

//删除
export function fetchDel() {

}

