/*
 * @Author: your name
 * @Date: 2021-06-03 15:59:56
 * @LastEditTime: 2021-06-03 17:33:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\costanalysismanage\costanalysis\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_RFQ)

// 获取KM的RFQ列表
export function getKmRfqList(params) {
  return requst({
    url: `/km-file-history/${ params.rfqId }/${ params.pageSize }/${ params.currPage }`,
    method: 'GET'
  })
}

// 关联附件
export function uploadFiles(params) {
  return requst({
    url: '/upload-files',
    method: 'POST',
    data: params
  })
}