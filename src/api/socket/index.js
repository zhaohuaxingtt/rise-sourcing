/*
 * @Author: your name
 * @Date: 2021-03-19 14:18:25
 * @LastEditTime: 2021-03-19 15:23:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\api\socket\index.js
 */

import socket from '@/utils/socket'

export function messageSocket(userId){
  return socket({
    baseUrl:process.env.VUE_APP_WEB_SOCKET,
    url:'/websocket/'+userId
  })
}