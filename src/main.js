/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:06
 * @LastEditTime: 2021-09-27 11:34:33
 * @LastEditors: Luoshuang
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\main.js
 */
/* eslint-disable no-undef */
import router from './router'
import App from './App.vue'
import store from './store'
import '../public/theme/index.css'  
import '@/assets/style/global/index.scss'
import './utils/mydirect'
import './permission'
import Vue from "vue"
import { iTable } from 'rise' 
// import AmapVue from '@amap/amap-vue'

// AmapVue.config.key = 'ad8bb27d93a0b17188e1b46872a446f8'
import Directives from '@/utils/directives/index'
require('./auto').init()
Vue.config.productionTip = false
Vue.prototype.$t = (key, value) => i18n.t(key, value);
Vue.prototype.$EventBus = new Vue()
Vue.use(Directives)
Promise.all([
    import('rise/web/lang/zh.js'),
    import('rise/web/lang/en.js')
]).then(([zhModule, enModule]) => {
    i18n.mergeLocaleMessage('zh', zhModule.default)
    i18n.mergeLocaleMessage('en', enModule.default)
})

Vue.component(iTable.name, iTable)

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')
