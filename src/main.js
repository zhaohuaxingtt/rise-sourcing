/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:06
 * @LastEditTime: 2022-03-21 10:36:27
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
import "./utils/thousandth"
import './permission'
import './i18n'
import Vue from 'vue'
import { iTable, iMessage } from 'rise'
// import AmapVue from '@amap/amap-vue'
import './utils/mydirect'
import './globalComponnets'

require('./auto').init()
Vue.config.productionTip = false
window.sessionStorage.setItem('env', process.env.NODE_ENV)
Promise.all([
	import('rise/web/lang/zh.js'),
	import('rise/web/lang/en.js'),
]).then(([zhModule, enModule]) => {
	i18n.mergeLocaleMessage('zh', zhModule.default)
	i18n.mergeLocaleMessage('en', enModule.default)
})

Vue.component(iTable.name, iTable)
Vue.prototype.$echarts = echarts()
// Vue.prototype.$message = iMessage

new Vue({
	router,
	store,
	i18n,
	render: (h) => h(App),
}).$mount('#app')
