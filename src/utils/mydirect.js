/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-03-28 20:55:27
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

