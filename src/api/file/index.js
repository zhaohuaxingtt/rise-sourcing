/*
 * @Author: your name
 * @Date: 2021-04-12 23:48:38
 * @LastEditTime: 2021-08-19 15:04:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\file\index.js
 */
import axios from '@/utils/axios.download'
import { serialize } from '@/utils'
import httpAxios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_COMMON)
const fileRequst = axios(process.env.VUE_APP_NEW_COMMON)
const sourcing = httpAxios(process.env.VUE_APP_SOURCING_WDL)
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
