/*
 * @Author: your name
 * @Date: 2021-03-18 15:52:47
 * @LastEditTime: 2021-04-01 18:59:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\utils\socket.js
 */

import { getToken } from "./index";

export default function socket({baseUrl,url}) {
  const vm = this
  if("WebSocket" in window){
    // eslint-disable-next-line no-undef
    const sockJs = new WebSocket(`${baseUrl}${url}?token=${getToken()}`)
    // eslint-disable-next-line no-undef
    sockJs.onopen = ()=>{
      if(this.vmcallBack){
        vm.vmcallBack({res:null,vm:sockJs})
      }
      console.log('socket connet success!');
    }
    sockJs.onmessage  = (data)=>{vm.vmcallBack({res:data,vm:sockJs})}
    sockJs.onclose = ()=>{console.log('socket closed!')}
    sockJs.onerror = error => {
      vm.errorCallBack(error)
    }
  }
}
socket.prototype.vmcallBack = null
socket.prototype.errorCallBack = null
socket.prototype.then = function(callBack){
  this.vmcallBack = callBack
  return this
}
socket.prototype.catch = function(callBack) {
  this.errorCallBack = callBack
  return this
}