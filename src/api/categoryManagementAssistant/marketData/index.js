/*
 * @Author: moxuan
 * @Description: 市场数据
 */

import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_AON)

//市场数据原材料下拉列表
export function getRawMaterialGroupSelectList() {
  return request({
    url: '/cmMdRawMaterialEntity/rawMaterialGroup',
    method: 'GET'
  })
}

//市场数据原材料数据
export function getrawMaterialGroupData(params) {
  return request({
    url: '/cmMdRawMaterialEntity/rawMaterialGroupData',
    method: 'POST',
    data: params
  })
}
