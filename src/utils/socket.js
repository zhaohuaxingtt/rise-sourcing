/*
 * @Author: your name
 * @Date: 2021-03-18 15:52:47
 * @LastEditTime: 2021-03-18 16:13:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\utils\socket.js
 */
export function socket({url,data,baseUrl}) {
  if(window.WebSocket){
    const socket = new WebSocket(url)
  }
}