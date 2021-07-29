/*
 * @Author: your name
 * @Date: 2021-07-28 14:58:07
 * @LastEditTime: 2021-07-28 15:00:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\aeko\detail\index.js
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_PARTS)

export function getAekoLiniePartInfo(params) {
  return requst({
    url: '/aeko/aeko-linie-part/info',
    method: 'POST',
    data: params
  })
}