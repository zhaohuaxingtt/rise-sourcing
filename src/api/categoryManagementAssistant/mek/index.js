/*
 * @Author: your name
 * @Date: 2021-08-06 15:34:45
 * @LastEditTime: 2021-08-06 15:39:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\categoryManagementAssistant\mek\index.js
 */
import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_AON)

//市场数据原材料下拉列表
export function getMekTable() {
  return request({
    url: '/mekRemark/get',
    method: 'POST',
  })
}
