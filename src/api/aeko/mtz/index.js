/*
 * @Autor: Hao,Jiang
 * @Date: 2021-10-28 17:06:50
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-10-30 21:12:58
 * @Description: 
 */
import axios from '@/utils/axios'
import download from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_PARTS)
const fileRequst = download(process.env.VUE_APP_PARTS)

// 列表查询
export function pageAekoMtz(data) {
  return requst({
    url: '/aeko/mtz/pageAekoMtz',
    method: 'POST',
    data,
  })
}

// 重置
export function resetAekoMtz(data) {
  return requst({
    url: '/aeko/mtz/resetAekoMtz',
    method: 'POST',
    data,
  })
}

// 保存
export function saveAekoMtz(data) {
  return requst({
    url: '/aeko/mtz/saveAekoMtz',
    method: 'POST',
    data,
  })
}

// 删除
export function removeAekoMtz(data) {
  return requst({
    url: '/aeko/mtz/removeAekoMtz',
    method: 'POST',
    data,
  })
}

// aeko 查看
export function aekoMtzDosage(data) {
  return requst({
    url: '/aeko/mtz/dosage',
    method: 'POST',
    data,
  })
}

// aeko 获取mtz 原材料
export function getMaterial(params) {
  return requst({
    url: '/aeko/get/material',
    method: 'GET',
    params,
  })
}