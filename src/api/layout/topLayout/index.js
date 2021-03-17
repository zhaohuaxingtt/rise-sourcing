/*
 * @Author: your name
 * @Date: 2021-03-16 19:08:28
 * @LastEditTime: 2021-03-17 13:21:32
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\api\layout\topLayout\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_COMMON)

// 获取消息数量
export function getCountInMail(parmars) {
  return requst({
    url: '/sys/message/sysMessage/countInMail',
    method: 'GET',
    params: parmars
  })
}

// 获取消息列表
export function queryByPage(parmars, options) {
  return requst({
    url: '/sys/message/sysMessage/queryByPage',
    method: 'GET',
    params: parmars,
    ...options
  })
}

// 逻辑删除消息
export function batchLogicDeleteMsgById(parmars) {
  return requst({
    url: '/sys/message/sysMessage/batchLogicDeleteMsgById',
    method: 'DELETE',
    params: parmars
  })
}
