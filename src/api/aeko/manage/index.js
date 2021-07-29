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