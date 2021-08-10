/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-07 14:35:59
 * @LastEditors: zbin
 * @Descripttion: your project
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_AON)

//mek--列表
export function getList(parmars) {
  return requst({
    url: `/mekScheme/page/list`,
    method: 'POST',
    data: parmars
  })
}
//材料组/供应商--列表
export function categoryList(parmars) {
  return requst({
    url: `/common/categoryList`,
    method: 'POST',
    data: parmars
  })
}
//车型--列表
export function carTypeList(parmars) {
  return requst({
    url: `/common/carTypeList`,
    method: 'POST',
    data: parmars
  })
}
//列表--保存
export function update(parmars) {
  return requst({
    url: `/mekScheme/update`,
    method: 'POST',
    data: parmars
  })
}
//列表--保存
export function mekInfoList(parmars) {
  return requst({
    url: `/mekMaterial/page`,
    method: 'POST',
    data: parmars
  })
}
