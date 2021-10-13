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

// 科室列表下拉
export function searchCommodity(data) {
  return requst({
      url: '/aeko/purchasing/search-commodity',
      method: 'POST',
      data,
  })
}

// aeko-列表搜索-车型下拉 
export function getSearchCartype(params) {
  return requst({
    url: '/aeko/purchasing/search-cartype',
    method: 'GET',
    params,
  })
}

// aeko -列表查询- 车型项目下拉
export function searchCartypeProject(params) {
  return requst({
    url: '/aeko/purchasing/search-cartype-project',
    method: 'GET',
    params,
  })
}

// aeko-列表查询-linie下拉
export function searchLinie(params) {
  return requst({
    url: '/aeko/purchasing/search-linie',
    method: 'GET',
    params,
  })
}



// 导入附件
export function uploadFiles(data) {
  return requst({
    url: '/file-histories/upload-files',
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

// 获取AEKO附件列表 
export function getFilesList(params) {
  const {
    hostId,
    sortColumn=null,
    isAsc=true,
    fileType=1000,
  } = params;
  return requst({
    url: `/file-histories/file-history//${hostId}/${sortColumn}/${isAsc}/${fileType}`,
    method: 'GET',
    params,
  })
}

// adeko项目导出
export function downloadAeko(data) {
  return fileRequst({
      url: '/aeko/aeko-project/download',
      method: 'POST',
      data,
  })
}

// 删除附件
export function deleteFiles(data) {
  return requst({
      url: '/file-histories/delete-files',
      method: 'DELETE',
      data,
  })
}


// 从TCM同步aeko 附件
export function synAekoAttachmentFromTCM(params) {
  return requst({
      url: '/aeko/synAekoAttachmentFromTCM',
      method: 'GET',
      params,
  })
}


// 从TCM同步aeko
export function synAekoFromTCM(params) {
  return requst({
      url: '/aeko/synAekoFromTCM',
      method: 'GET',
      params,
  })
}

// 获取TCM列表
export function getAekoImportRecordPage(data) {
  return requst({
      url: '/aeko/aekoImportRecordPage',
      method: 'POST',
      data,
  })
}

// TCM-手工导入
export function manualImportAekoFromTCM(params) {
  return requst({
      url: '/aeko/manualImportAekoFromTCM',
      method: 'GET',
      params,
  })
}


// 会议通过
export function adoptedMeeting(data) {
  return requst({
      url: '/aeko/adoptedMeeting',
      method: 'POST',
      data,
  })
}