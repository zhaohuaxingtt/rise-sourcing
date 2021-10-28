/*
 * @Author: wentliao
 * @Date: 2021-10-28 10:01:43
 * @Description: AEKO查看相关接口
 */

import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PARTS)

// aeko查看分页查询
export function getCheckList(data) {
    return requst({
      url: '/aeko/view/page',
      method: 'POST',
      data,
    })
}