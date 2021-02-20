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
