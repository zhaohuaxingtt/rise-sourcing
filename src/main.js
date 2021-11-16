/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:06
 * @LastEditTime: 2021-11-08 18:26:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\main.js
 */
/* eslint-disable no-undef */
import router from './router'
import App from './App.vue'
import store from './store'
import echarts from './utils/echarts'
import '../public/theme/index.css'
import '@/assets/style/global/index.scss'
import './permission'
import Vue from "vue"
import { iTable } from 'rise' 
// import AmapVue from '@amap/amap-vue'
import './utils/mydirect'
require('./auto').init()
Vue.config.productionTip = false
Promise.all([
  import('rise/web/lang/zh.js'),
  import('rise/web/lang/en.js'),
]).then(([zhModule, enModule]) => {
  i18n.mergeLocaleMessage('zh', zhModule.default)
  i18n.mergeLocaleMessage('en', enModule.default)
})

Vue.component(iTable.name, iTable)

Vue.prototype.$echarts = echarts();

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
