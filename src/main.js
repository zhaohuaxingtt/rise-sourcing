/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:06
 * @LastEditTime: 2021-08-05 12:06:34
 * @LastEditors: zbin
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\main.js
 */
/* eslint-disable no-undef */
import router from './router'
import App from './App.vue'
import store from './store'
import '../public/theme/index.css'  
import '@/assets/style/global/index.scss'
import './utils/mydirect'
import './permission'
// import AmapVue from '@amap/amap-vue'

// AmapVue.config.key = 'ad8bb27d93a0b17188e1b46872a446f8'
require('./auto').init()
Vue.config.productionTip = false
Vue.prototype.$t = (key, value) => i18n.t(key, value);
Vue.prototype.$EventBus = new Vue()
Promise.all([
    import('rise/web/lang/zh.js'),
    import('rise/web/lang/en.js')
]).then(([zhModule, enModule]) => {
    i18n.mergeLocaleMessage('zh', zhModule.default)
    i18n.mergeLocaleMessage('en', enModule.default)
})

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')
