/*
 * @Author: Luoshuang
 * @Date: 2021-07-29 15:30:08
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-29 17:20:03
 * @Description: 项目管理相关接口
 * @FilePath: \front-web\src\api\project\index.js
 */

import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_PROJECT)

// 产品组排程-获取车型项目下拉
export function getCarTypePro() {
  return requst({
    url: '/car-type/carTypePro',
    method: 'GET',
  })
}

// 产品组排程-获取车型项目节点列表
export function getCarTypeProPepTimeNode(cartypeProId) {
  return requst({
    url: `/car-type/carTypeProPepTimeNode/${cartypeProId}`,
    method: 'GET',
  })
}

// 获取产品组周期视图
export function getProductGroupInfoList(cartypeProId) {
  return requst({
    url: `/product-group-schedule/productGroupInfoList/${cartypeProId}`,
    method: 'GET'
  })
}

// 获取产品组节点视图
export function getProductGroupNodeInfoList(cartypeProId) {
  return requst({
    url: `/product-group-schedule/productGroupInfoNodeList/${cartypeProId}`,
    method: 'GET'
  })
}

// 保存产品组周期视图
export function saveProductGroupInfoList(params) {
  return requst({
    url: `/product-group-schedule/saveProductGroupInfoList`,
    method: 'POST',
    data: params
  })
}