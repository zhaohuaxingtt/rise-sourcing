/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-02-19 16:07:45
 * @LastEditors: Please set LastEditors
 * @Description: 组合所有store
 * @FilePath: \rise\src\store\index.js
 */
/* eslint-disable no-undef */
const path = require('path')
const files = require.context('./module',false,/\.js$/)
const modules = {}
files.keys().forEach(key => {
  const name = path.basename(key, '.js')
  modules[name] = files(key).default || files(key)
})
export default new Vuex.Store({
  modules:modules
})