/*
 * @Author: wentliao
 * @Date: 2021-07-29 16:53:27
 * @Description: aeko相关接口
 */


import axios from '@/utils/axios'
import download from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_PARTS)
const fileRequst = download(process.env.VUE_APP_PARTS)

// 列表查询
export function getManageList(data) {
  return requst({
    url: '/aeko/purchasing/page',
    method: 'POST',
    data,
  })
}

// aeko状态下拉框
export function searchAekoStatus(params) {
  return requst({
    url: '/aeko/purchasing/search-aeko-status',
    method: 'GET',
    params,
  })
}

// 品牌下拉框 
export function searchBrand(params) {
  return requst({
    url: '/aeko/purchasing/search-brand',
    method: 'GET',
    params,
  })
}

// 封面状态下拉框
export function searchCoverStatus(params) {
  return requst({
    url: '/aeko/purchasing/search-cover-status',
    method: 'GET',
    params,
  })
}

// 导入附件
export function uploadFiles(data) {
  return requst({
    url: '/file-history/upload-files',
    method: 'POST',
    data,
  })
}

// 
// aeko撤销
export function purchasingCancel(params) {
  return requst({
    url: '/aeko/purchasing/cancel',
    method: 'GET',
    params,
  })
}


// 删除aeko
export function deleteAeko(params) {
  return requst({
    url: '/aeko/delete',
    method: 'GET',
    params,
  })
}

// aeko-列表搜索-车型项目管理 
export function getSearchCartype(params) {
  return requst({
    url: '/aeko/purchasing/search-cartype',
    method: 'GET',
    params,
  })
}


// 导入AEKO
export function importAeko(data) {
  return requst({
      url: '/aeko/importAeko',
      method: 'POST',
      data,
  })
}

// 模板下载
export function templateDowmload(params) {
  return fileRequst({
    url: '/template/dowmload',
    method: 'GET',
    params,
  })
}

// 获取附件列表 
export function getFilesList(params) {
  const {
    hostId,
    sortColumn=null,
    isAsc=true,
    fileType=0,
    pageNo,
    pageSize=10,
  } = params;
  return requst({
    url: `/file-history/file-history/${hostId}/${sortColumn}/${isAsc}/${fileType}/${pageNo}/${pageSize}`,
    method: 'GET',
    params,
  })
}