/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:06
 * @LastEditTime: 2021-03-31 23:39:48
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
import './permission' 

require('./auto').init()
const ElementUI = require('element-ui')
Vue.config.productionTip = false
Vue.prototype.$t = (key, value) => i18n.t(key, value);

// window.addEventListener("setItemEvent",(e) => {
//   console.log(e.target.localStorage.lang);
//   // window.location.reload();
//   const vm = new Vue();
//   vm.$forceUpdate(() => {
//     Vue.use(ElementUI, {
//       i18n: (key, value) => {
//         if (key === "el.pagination.goto") {
//           value = e.target.localStorage.lang == 'zh' ? '前往' : 'go to'
//         }
//         return (key, value)
//       }
//     })
//   });
// });
Vue.use(ElementUI, {
  i18n: (key, value) => {
    let lang = localStorage.getItem('lang');
    if (key === "el.pagination.goto") {
      value = lang == 'zh' ? '前往' : 'go to'
    }
    if (key === "el.pagination.pagesize") {
      value = lang == 'zh' ? '条/页' : '/page'
    }
    if (key === "el.pagination.pageClassifier") {
      value = lang == 'zh' ? '页' : 'page'
    }
    return (key, value)
  }
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
