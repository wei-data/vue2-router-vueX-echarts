import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import request from './request/index'
import * as echarts from 'echarts'
import('../public/css/reset.css')

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.prototype.$http = request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
