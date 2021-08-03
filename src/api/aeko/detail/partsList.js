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
