/*
 * @Author: yuszhou
 * @Date: 2021-02-22 10:22:12
 * @LastEditTime: 2021-02-24 10:04:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\api\ui.js
 */

import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_BASE_MOCK)

export function getTableList(parmars){
  return requst({
    url:'https://www.fastmock.site/mock/5cd3e97d6126b18b5e16f3e499489335/api/getinforsheetsgin',
    method:'POST',
    data:parmars
  })
}