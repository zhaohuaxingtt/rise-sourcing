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
export function getCountInMail(params) {
  return requst({
    url: '/sys/message/sysMessage/countInMail',
    method: 'GET',
    params: params
  })
}

// 获取消息列表
export function queryByPage(params, options) {
  return requst({
    url: '/sys/message/sysMessage/queryByPage',
    method: 'GET',
    params: params,
    ...options
  })
}

// 逻辑删除消息
export function batchLogicDeleteMsgById(params) {
  return requst({
    url: '/sys/message/sysMessage/batchLogicDeleteMsgById',
    method: 'DELETE',
    params: params
  })
}

// 消息已读
export function readById(params) {
  return requst({
    url: '/sys/message/sysMessage/readById',
    method: 'PUT',
    params: params
  })
}

// 消息全部已读
export function batchReadById(params) {
  return requst({
    url: '/sys/message/sysMessage/batchReadById',
    method: 'PUT',
    params: params
  })
}
