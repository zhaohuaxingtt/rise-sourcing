/*
 * @Author: your name
 * @Date: 2021-02-24 10:19:28
 * @LastEditTime: 2021-02-24 10:19:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\api\partsign\editordetail\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PARTS)

// 获取零件详情-每车用量
export function getPerCarDosageInfo(params) {
  return requst({
    url: '/tp-records/perCarDosage/info',
    method: 'POST',
    data: params
  })
}

// 获取零件详情-获取所有版本
export function getPerCarDosageVersion(params) {
  return requst({
    url: '/tp-records/perCarDosage/version',
    method: 'POST',
    data: params
  })
}

// 确认/拒绝/导出每车用量信息
export function putPerCarDosage(params) {
  return requst({
    url: '/tp-records/perCarDosage',
    method: 'PUT',
    params: params
  })
}

// 获取附件信息
export function getInfoAnnexPage(params) {
  return requst({
    url: '/tp-records/tpInfo/getInfoAnnexPage',
    method: 'GET',
    params: params
  })
}

// 获取附件信息
export function getVolume(params) {
  return requst({
    url: '/tp-records/tpInfo/getVolume',
    method: 'GET',
    params: params
  })
}
