import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
// 引入iconfont
import './assets/font/iconfont.css'

import axios from "axios"
// 挂载axios
Vue.prototype.$http = axios
// 设置访问路径
axios.defaults.baseURL = "http://localhost:9000"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
