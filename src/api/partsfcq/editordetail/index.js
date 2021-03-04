/*
 * @Author: moxuan
 * @Date: 2021-03-03 17:07:22
 * @LastEditTime: 2021-02-25 11:08:48
 * @LastEditors: Please set LastEditors
 * @Description: fcq列表
 * @FilePath: \rise\src\api\partsfcq\editordetail\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_BASE_MOCK)

export function getLogisticsRequirementsList(parmars) {
  return requst({
    url: 'https://www.fastmock.site/mock/5cd3e97d6126b18b5e16f3e499489335/api/partfcq/getLogisticsRequirements',
    method: 'GET',
    data: parmars
  })
}
