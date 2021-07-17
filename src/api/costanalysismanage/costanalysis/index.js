/*
 * @Author: your name
 * @Date: 2021-06-03 15:59:56
 * @LastEditTime: 2021-06-07 18:10:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\costanalysismanage\costanalysis\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_RFQ)
const quotationRequst = axios(process.env.VUE_APP_QUOTATION)

// 获取KM的RFQ列表
export function getKmFileHistory(params) {
  return requst({
    url: `/km-file-history/${ params.hostId }/${ params.type }/${ params.pageSize }/${ params.currPage }`,
    method: 'GET'
  })
}

// 关联附件
export function uploadFiles(params) {
  return requst({
    url: '/km/upload-files',
    method: 'POST',
    data: params
  })
}

// 删除关联附件记录
export function deleteFileHistory(params) {
  return requst({
    url: '/file-history',
    method: 'POST',
    data: params
  })
}

// L3文件
export function partCbdKmFile(params) {
  return quotationRequst({
    url: '/cbd-files/partCbdKmFile',
    method: 'POST',
    data: params
  })
}
