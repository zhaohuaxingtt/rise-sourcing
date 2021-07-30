/*
 * @Author: wentliao
 * @Date: 2021-07-29 16:53:27
 * @Description: aeko相关接口
 */


import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_PARTS)

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