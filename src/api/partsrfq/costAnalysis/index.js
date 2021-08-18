/*
 * @Author: youyuan
 * @Date: 2021-08-06 16:27:41
 * @LastEditTime: 2021-08-18 17:10:53
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\api\partsrfq\costAnalysis\index.js
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

// 校验名称
export function getCostStructureAnalysisByName(params) {
  return request({
    url: '/costStructure/getCostStructureAnalysisByName',
    method: 'POST',
    data: params
  })
}

//保存
export function fetchSave(params) {
  return request({
    url: '/costStructure/save',
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

//删除
export function fetchDel(params) {
  return request({
    url: '/costStructure/delete',
    method: 'POST',
    data: params
  })
}

// 修改
export function fetchModify(params) {
  return request({
    url: '/costStructure/modify',
    method: 'POST',
    data: params
  })
}

// 置顶
export function fetchStick(params) {
  return request({
    url: '/costStructure/top',
    method: 'POST',
    data: params
  })
}
