/*
 * @Author: Luoshuang
 * @Date: 2021-04-20 19:16:52
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-10-18 16:52:52
 * @Description: 
 * @FilePath: \front-web\src\api\file\upload.js
 */
import axios from '@/utils/axios'
import store from '@/store'

const requst = axios(process.env.VUE_APP_BASE_UPLOAD_API)
const fileRequst = axios(process.env.VUE_APP_BASE_UPLOAD_API)
const requstUploads = axios(process.env.VUE_APP_POWEBI_KPI + '/web/aon')

export function uploadFile(parmars) {
    return requst({
        url: '/upload',
        method: 'POST',
        data: parmars
    })
}

export function udSingleFile(parmars) {
    return requst({
        url: '/udMutilfilesController',
        method: 'POST',
        data: parmars
    })
}

// 批量下载
export function downloadFiles(params) {
    return requst({
        url: `/download`,
        method: 'GET',
        params
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
        data: formData
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
    formData.append('multifile', params.multifile || []) // 文件

    return fileRequst({
        url: `/udMutilfilesController`,
        method: 'POST',
        data: formData
    }).then(res => {
        if (Array.isArray(res) || res.length > 0) {
            return {
                code: 200,
                data: res,
                desEn: "success",
                desZh: "操作成功"
            }
        } else {
            return {
                code: 400,
                data: null,
                desEn: "error",
                desZh: "操作失败"
            }
        }
    })
}