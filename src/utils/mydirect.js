/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-03-12 18:26:28
 * @LastEditors: Please set LastEditors
 * @Description: 自定义指令文件。
 * @FilePath: \rise\src\utils\mydirect.js
 */

import store from '../store'
// 按钮权限
// eslint-disable-next-line no-undef
Vue.directive('permission', {
  bind: function (el,binding,vnode) {
     if(!store.state.permission.whiteBtnList.find(i=>i == binding.expression)){
       el.remove()
     }
  }
});