/*
 * @Author: wentliao
 * @Date: 2021-08-03 14:20:04
 * @Description: 详情页--零件清单相关接口
 */


import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PARTS)

// 零件清单分页查询  
export function getPartPage(data) {
  return requst({
    url: '/aeko/part/page',
    method: 'POST',
    data,
  })
}

// 删除零件
export function deletePart(data) {
  return requst({
    url: '/aeko/part/delete',
    method: 'POST',
    data,
  })
}

// 分配科室
export function assignDept(data) {
  return requst({
    url: '/aeko/part/assign-dept',
    method: 'POST',
    data,
  })
}

// 分派采购员   
export function assignLinie(data) {
  return requst({
    url: '/aeko/part/assign-linie',
    method: 'POST',
    data,
  })
}