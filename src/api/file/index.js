/*
 * @Author: your name
 * @Date: 2021-04-12 23:48:38
 * @LastEditTime: 2023-03-05 17:24:21
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\file\index.js
 */
import axios from '@/utils/axios.download'
import { serialize } from '@/utils'
import httpAxios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_COMMON)
const fileRequst = axios(process.env.VUE_APP_BASE_UPLOAD_API + '/fileud')
const file = httpAxios(process.env.VUE_APP_BASE_UPLOAD_API + '/fileud')
const wopi = httpAxios(process.env.VUE_APP_BASE_UPLOAD_API)
const sourcing = httpAxios(process.env.VUE_APP_SOURCING)
// const fileRequstDown = axios(process.env.VUE_APP_FILEAPI + '/fileud')
export function downloadFile(parmars) {
  return requst({
    url: `/download?applicationName=${parmars.applicationName}&fileList=${parmars.fileList}`,
    method: 'GET',
  })
}

export function downloadFileUd(params) {
  //blob
  return file({
    url: `/udDown?fileIds=${params}`,
    method: 'GET',
    // responseType: 'blob',
  })
}

export function downloadUdFile(params) {
  return fileRequst({
    url: `/udDown?${
      Array.isArray(params)
        ? serialize(
            params.map((id) => ({ fileIds: id })),
            Array
          )
        : 'fileIds=' + params
    }`,
    method: 'GET',
  })
}

// 自定义文件名下载
export function downloadUdFileWithName(params, fileName) {
  return fileRequst({
    url: `/udDownWithName?${
      Array.isArray(params)
        ? serialize(
            params.map((id) => ({ fileIds: id })),
            Array
          )
        : 'fileIds=' + params
    }&fileName=${fileName}`,
    method: 'GET',
  })
}

//sourcing 获取文件列表不需要分页。
export function getFile(params) {
  let {
    fileType,
    hostId,
    isAsc = true,
    sortColumn = 'uploadDate',
    pageNo,
    pageSize,
  } = params
  return sourcing({
    url: `/file-histories/page/${hostId}/${sortColumn}/${isAsc}/${fileType}/${pageSize}/${pageNo}`,
    method: 'get',
  })
}
//sourcing 获取文件列表带分页。
export function getFiles(params) {
  let {
    fileType,
    hostId,
    isAsc = true,
    sortColumn = 'uploadDate',
    page,
    currPage,
  } = params
  return sourcing({
    url: `/file-histories/page/${hostId}/${sortColumn}/${isAsc}/${fileType}/${currPage}/${page}`,
    method: 'get',
  })
}
//sourcing 删除文件。
export function deleteFiles(params) {
  return sourcing({
    url: `/file-histories/delete-files`,
    method: 'DELETE',
    data: params,
  })
}

//sourcing 更新文件排序
export function updateSort(data) {
  return sourcing({
    url: `/file-histories/update-sort/${data.fileId}/${data.isUp}`,
    method: 'PATCH',
    data,
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
    method: 'POST',
    data,
  })
}

// 文件删除
export function delFiles(params) {
  return file({
    url: `/udDel?${serialize(params, Array)}`,
    method: 'POST',
  })
}

// 查看文件
export function getFileByFileId(params) {
  return file({
    url: `/getFileByFileId`,
    method: 'GET',
    responseType: 'blob',
    params: {
      fileId: params,
    },
  })
}

// 获取文件嵌入地址
export function getFileUrl(fileId,fileName) {
  return wopi({
    url: `/wopi/getWopiUrl/${fileId}/${fileName}`,
    method: 'GET',
  })
}