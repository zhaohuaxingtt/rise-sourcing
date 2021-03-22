/*
 * @Author: your name
 * @Date: 2021-03-18 15:52:47
 * @LastEditTime: 2021-03-22 15:13:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\utils\socket.js
 */

export default function socket({baseUrl,url}) {
  const vm = this
  if("WebSocket" in window){
    // eslint-disable-next-line no-undef
    const sockJs = new WebSocket(baseUrl+url)
    // eslint-disable-next-line no-undef
    sockJs.onopen = ()=>{
      if(this.vmcallBack){
        vm.vmcallBack({res:null,vm:sockJs})
      }
      console.log('socket connet success!');
    }
    sockJs.onmessage  = (data)=>{vm.vmcallBack({res:data,vm:sockJs})}
    sockJs.onclose = ()=>{console.log('socket closed!')}
  }
}
socket.prototype.vmcallBack = null
socket.prototype.then = function(callBack){
  this.vmcallBack = callBack
}