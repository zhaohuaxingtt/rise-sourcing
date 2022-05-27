/*
 * @Author: Luoshuang
 * @Date: 2021-04-20 19:16:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-06 13:46:04
 * @Description:
 * @FilePath: \front-web\src\api\file\upload.js
 */
import axios from '@/utils/axios'
import store from '@/store'

const requst = axios(process.env.VUE_APP_BASE_UPLOAD_API + '/fileud')
const fileRequst = axios(process.env.VUE_APP_BASE_UPLOAD_API + '/fileud')
const requstUploads = axios(process.env.VUE_APP_POWEBI_KPI + '/web/aon')

export function uploadFile(parmars) {
  return fileRequst({
    url: '/udSingleFile',
    method: 'POST',
    data: parmars,
  })
}

export function uploadFileNew(parmars) {
  return requst({
    url: '/uploadFile',
    method: 'POST',
    data: parmars,
  })
}

export function udSingleFile(parmars) {
  return requst({
    url: '/udMutilfilesController',
    method: 'POST',
    data: parmars,
  })
}

// 批量下载
export function downloadFiles(params) {
  return requst({
    url: `/download`,
    method: 'GET',
    params,
  })
}

// 上传 + 水印 接口来源ws3
export function uploads(params) {
  const formData = new FormData()
  formData.append('applicationName', params.applicationName || 'rise') // 桶名，默认固定rise
  formData.append('businessId', params.businessId || 8025) // 业务id，默认固定8025
  formData.append('currentUserId', store.state.permission.userInfo.id) // 用户id
  formData.append('type', params.type || 1) // 文件类型 1:OBS 2:NFS，默认1
  formData.append('multifile', params.multifile || []) // 文件
  formData.append('watermark', params.watermark || '')

  return requstUploads({
    url: `/common/uploads`,
    method: 'POST',
    data: formData,
  })
}
// 上传 统一使用该接口
export function uploadUdFile(params) {
  const formData = new FormData()
  formData.append('applicationName', params.applicationName || 'rise') // 桶名，默认固定rise
  formData.append('businessId', params.businessId || 8025) // 业务id，默认固定8025
  // formData.append('currentUserId', store.state.permission.userInfo.id) // 用户id
  formData.append('currentUser', store.state.permission.userInfo.id) // 用户id
  formData.append('type', params.type || 1) // 文件类型 1:OBS 2:NFS，默认1
  // formData.append('multifile', params.multifile || []) // 文件
  formData.append('file', params.multifile)

  return fileRequst({
    // url: `/udMutilfilesController`,
    url: `/udSingleFile`,
    method: 'POST',
    data: formData,
  }).then((res) => {
    if (Array.isArray(res.data)) {
      return res
    } else if (typeof res?.data === 'object') {
      return {
        ...res,
        data: [res.data],
      }
    }
    return res
  })
}
