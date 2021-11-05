/*
 * @Author: your name
 * @Date: 2021-02-24 10:19:28
 * @LastEditTime: 2021-04-12 23:58:01
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
    data: params
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

// 获取表数据
export function getVolume(params) {
  return requst({
    url: '/tp-records/tpInfo/getVolume',
    method: 'GET',
    params: params
  })
}

// 获取询价资料版本
export function getAttachmentVersion(params) {
  return requst({
    url: '/tp-records/tpInfo',
    method: 'POST',
    data: {
      attachmentVersionDTO: params
    }
  })
}

// 根据版本获取询价资料
export function getAttachment(params) {
  return requst({
    url: '/tp-records/tpInfo',
    method: 'POST',
    data: {
      tpInfoAttachmentDTO: params
    }
  })
}

// 确认/拒绝 询价资料版本
export function patchAttachmentVersion(params) {
  return requst({
    url: '/tp-records/tpInfo',
    method: 'PATCH',
    data: {
      attachmentConfirmDTO: params
    }
  })
}