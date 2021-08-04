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