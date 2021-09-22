/*
 * @Author: your name
 * @Date: 2021-04-12 23:48:38
 * @LastEditTime: 2021-09-13 17:50:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\file\index.js
 */
import axios from '@/utils/axios.download'
import { serialize } from '@/utils'
import httpAxios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_COMMON)
const fileRequst = axios(process.env.VUE_APP_NEW_COMMON)
const sourcing = httpAxios(process.env.VUE_APP_RFQ)
export function downloadFile(parmars) {
    return requst({
        url: `/download?applicationName=${parmars.applicationName}&fileList=${parmars.fileList}`,
        method: 'GET'
    })
}

export function downloadUdFile(params) {
    return fileRequst({
        url: `/fileud/udDown?${ Array.isArray(params) ? serialize(params.map(id => ({ fileIds: id })), Array) : 'fileIds=' + params }`,
        method: 'POST'
    })
}

// 自定义文件名下载
export function downloadUdFileWithName(params,fileName) {
    return fileRequst({
        url: `/fileud/udDownWithName?${ Array.isArray(params) ? serialize(params.map(id => ({ fileIds: id })), Array) : 'fileIds=' + params }&fileName=${fileName}`,
        method: 'POST'
    })
}


//sourcing 获取文件列表不需要分页。
export function getFile(params) {
    let {fileType,hostId,isAsc=true,sortColumn='uploadDate'} = params
    return sourcing({
        url: `/file-histories/file-history/${hostId}/${sortColumn}/${isAsc}/${fileType}`,
        method: 'get'
    })
}
//sourcing 获取文件列表带分页。
export function getFiles(params) {
    let {fileType,hostId,isAsc=true,sortColumn='uploadDate',page,currPage} = params
    return sourcing({
        url: `/file-histories/page/${hostId}/${sortColumn}/${isAsc}/${fileType}/${page}/${currPage}`,
        method: 'get'
    })
}
//sourcing 删除文件。
export function deleteFiles(params) {
    return sourcing({
        url: `/file-histories/delete-files`,
        method: 'DELETE',
        data:params
    })
}

//sourcing 更新文件排序
export function updateSort(data) {
    return sourcing({
        url: `/file-histories/update-sort/${data.fileId}/${data.isUp}`,
        method: "PATCH",
        data
    })
}

/**
 * @description: sourcing 上传文件（CF上传完业务回调）
 * 上传分为2步，
 * 第一步，调用CF接口上传至OSS
 * 第二部，根据返回的uploadId，调业务回调接口完成上传
 * @param {*} data
 * @return {*}
 */
export function uploadfile(data) {
    return sourcing({
        url: `/file-histories/upload-file`,
        method: "POST",
        data
    })
}