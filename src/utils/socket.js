/*
 * @Author: your name
 * @Date: 2021-03-18 15:52:47
 * @LastEditTime: 2021-03-19 15:59:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\utils\socket.js
 */

export default function socket({baseUrl,url}) {
  return new Promise((r,j)=>{
    if("WebSocket" in window){
      // eslint-disable-next-line no-undef
      const sockJs = new WebSocket(baseUrl+url)
      // eslint-disable-next-line no-undef
      sockJs.onopen = ()=>{
        r({res:null,vm:sockJs})
        console.log('socket connet success!');
      }
      sockJs.onmessage  = (data)=>{r({res:data,vm:sockJs})}
      sockJs.onclose = ()=>{console.log('socket closed!')}
      return sockJs
    }
  })
}