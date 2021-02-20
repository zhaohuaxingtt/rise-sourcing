/*
 * @Author: your name
 * @Date: 2021-02-19 14:29:06
 * @LastEditTime: 2021-02-20 12:01:54
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\main.js
 */
/* eslint-disable no-undef */
import router from './router'
import App from './App.vue'
import store from './store'
import '@/assets/style/global/index.scss'
import './utils/mydirect'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
