/*
 * @Author: your name
 * @Date: 2021-02-24 10:19:28
 * @LastEditTime: 2021-02-24 10:19:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\api\partsign\editordetail\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_BASE_MOCK)

export function getEnquiryList(parmars) {
  return requst({
    url: 'https://www.fastmock.site/mock/5cd3e97d6126b18b5e16f3e499489335/api/partsign/getEnquiryList',
    method: 'GET',
    data: parmars
  })
}