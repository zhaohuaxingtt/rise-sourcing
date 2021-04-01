/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-04-01 22:12:44
 * @LastEditors: Please set LastEditors
 * @Description: 自定义指令文件。
 * @FilePath: \rise\src\utils\mydirect.js
 */

import store from '../store'
// 按钮权限
// eslint-disable-next-line no-undef
Vue.directive('permission', {
  inserted: function (el,binding) {
     if(!store.state.permission.whiteBtnList[binding.expression]){       
      el.parentNode.removeChild(el)
     }
  }
});

//切换I8n动态更新element值
// eslint-disable-next-line no-undef
Vue.directive('update', {
  bind:function(el,binding,vnode){
    vnode.key = parseInt(Math.random()*1000000000)
  },
});

