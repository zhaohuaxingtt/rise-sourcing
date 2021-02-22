/*
 * @Author: your name
 * @Date: 2021-02-19 14:29:06
 * @LastEditTime: 2021-02-22 18:01:34
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
Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
