/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:06
<<<<<<< HEAD
<<<<<<< HEAD
 * @LastEditTime: 2021-09-27 10:24:33
 * @LastEditors: Please set LastEditors
=======
 * @LastEditTime: 2021-09-27 11:34:33
 * @LastEditors: Luoshuang
>>>>>>> workStream1
=======
 * @LastEditTime: 2021-09-27 10:21:53
 * @LastEditors: Please set LastEditors
>>>>>>> 6bc1e687ccbf9505a092fa42673d7c62d65f345c
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\main.js
 */
/* eslint-disable no-undef */
import router from './router'
import App from './App.vue'
import store from './store'
import '../public/theme/index.css'
import '@/assets/style/global/index.scss'
import './permission'
<<<<<<< HEAD
<<<<<<< HEAD
import { iTable } from "rise"
=======
import Vue from "vue"
import { iTable } from 'rise' 
// import AmapVue from '@amap/amap-vue'
>>>>>>> workStream1
=======
import { iTable } from "rise"
>>>>>>> 6bc1e687ccbf9505a092fa42673d7c62d65f345c

require('./auto').init()
Vue.config.productionTip = false
Vue.prototype.$t = (key, value) => i18n.t(key, value);
Promise.all([
  import('rise/web/lang/zh.js'),
  import('rise/web/lang/en.js'),
]).then(([zhModule, enModule]) => {
  i18n.mergeLocaleMessage('zh', zhModule.default)
  i18n.mergeLocaleMessage('en', enModule.default)
})

Vue.component(iTable.name, iTable)

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
