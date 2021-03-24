/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:06
 * @LastEditTime: 2021-03-24 17:05:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\main.js
 */
/* eslint-disable no-undef */
import router from './router'
import App from './App.vue'
import store from './store'
import '@/assets/style/global/index.scss'
import './utils/mydirect'
// import './permission' 
require('./auto').init()
Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
