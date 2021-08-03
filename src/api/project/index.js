/*
 * @Author: Luoshuang
 * @Date: 2021-07-29 15:30:08
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-03 11:13:48
 * @Description: 项目管理相关接口
 * @FilePath: \front-web\src\api\project\index.js
 */

import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_PROJECT)

// 产品组排程-获取车型项目下拉
export function getCarTypePro() {
  return requst({
    url: '/car-type',
    method: 'GET',
  })
}

// 产品组排程-获取车型项目节点列表
export function getCarTypeProPepTimeNode(cartypeProId) {
  return requst({
    url: `/car-type/pepTimeNode/${cartypeProId}`,
    method: 'GET',
  })
}

// 获取产品组周期视图
export function getProductGroupInfoList(cartypeProId) {
  return requst({
    url: `/product-group-schedule/info/${cartypeProId}`,
    method: 'GET'
  })
}

// 获取产品组节点视图
export function getProductGroupNodeInfoList(cartypeProId) {
  return requst({
    url: `/product-group-schedule/infoNode/${cartypeProId}`,
    method: 'GET'
  })
}

// 保存产品组周期视图
export function saveProductGroupInfoList(params) {
  return requst({
    url: `/product-group-schedule/info`,
    method: 'POST',
    data: params
  })
}

// 获取概览列表
export function getOverview() {
  return requst({
    url: '/car-type/user/overview',
    method: 'GET'
  })
}

// 获取用户最后一次操作的车型项目
export function getLastOperateCarType() {
  return requst({
    url: '/car-type/userLastOperate',
    method: 'GET'
  })
}

// 获取可选择车型列表
export function getSelectCarType(carTypeProId) {
  return requst({
    url: '/car-type/user?carTypeProId='+carTypeProId,
    method: 'GET'
  })
}

// 更新可选择车型列表
export function updateSelectCarType(params) {
  return requst({
    url: '/car-type/attention',
    method: 'PUT',
    data: params
  })
}

// 根据车型项目id查询项目采购员
export function getBuyer(carTypeProjectId) {
  return requst({
    url: `/progress-confirm/user/${carTypeProjectId}`,
    method: 'GET'
  })
}

// 查询询价采购员下拉
export function getFsUserList(params) {
  return requst({
    url: '/progress-confirm/user?ids='+params.join(','),
    method: 'GET',
  })
}

export function deliveryProduct(params) {
  return requst({
    url: '/progress-confirm/productGroupSchedule',
    method: 'POST',
    data: params
  })
}

// 获取产品组选择弹窗列表
export function getProductSelectList(cartypeProId) {
  return requst({
    url: `/product-group-schedule/select/${cartypeProId}`,
    method: 'GET'
  })
}

// 获取车型算法配置
export function getCarConfig(cartypeProId) {
  return requst({
    url: `/project-group-config/carTypePro/${cartypeProId}`,
    method: 'GET'
  })
}

// 保存车型算法配置
export function updateCarConfig(params) {
  return requst({
    url: `/project-group-config/carTypePro`,
    method: 'POST',
    data: params
  })
}

// 保存选择的产品组
export function saveProductSelectList(params) {
  return requst({
    url: '/product-group-schedule/select',
    method: 'POST',
    data: params
  })
}