/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:06
 * @LastEditTime: 2021-09-17 23:42:37
 * @LastEditors: Please set LastEditors
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
require('./auto').init()
Vue.config.productionTip = false
Vue.prototype.$t = (key, value) => i18n.t(key, value);
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
