/*
 * @Author: wentliao
 * @Date: 2021-08-04 14:50:32
 * @Description: AEKO详情页-封面表态相关接口
 */

import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PARTS)

// 获取封面表态详情
export function getCoverDetail(params) {
  return requst({
    url: '/aeko/cover-detail',
    method: 'GET',
    params,
  })
}

// linie分页查询
export function getLiniePage(params) {
  return requst({
    url: '/aeko/cover-detail-cost-linie-dimension-page',
    method: 'GET',
    params,
  })
}


// 封面表态详情 linie视角
export function getLinieCoverDetail(params) {
  return requst({
    url: '/aeko/linie_cover-detail',
    method: 'GET',
    params,
  })
}

// 查询本部门下的前期采购员
export function getFsUser(params) {
  return requst({
    url: '/aeko/fs-user',
    method: 'GET',
    params,
  })
}