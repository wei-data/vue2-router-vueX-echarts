import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
// Vue.prototype.$http = axios.create({
//   baseURL: 'http://127.0.0.1:5000',
//   timeout: 1000 // 设置请求超时时间 10s
// })
axios.defaults.baseURL = 'http://127.0.0.1:5000'
export default new Vuex.Store({
  state: {
    // 后台首页的echarts数据
    echarts: '',
    //   订单列表信息
    proList: '',
    individual: ''
  },
  getters: {
  },
  mutations: {
    proList (state, val) {
      state.proList = val
    }
  },
  actions: {
    // 请求后台首页echarts数据给state
    async echartsA (context) {
      // console.log(this.http)
      const { data } = await axios.get('/order/totaldata')
      // context.commit('updateE', data)
      context.state.echarts = data
    },
    async proList (context) {
      const { data: { data } } = await axios.get('/order/list', {
        params: {
          currentPage: 1,
          pageSize: 21
        }
      })
      context.state.proList = data
    }
  },
  modules: {
  }
})
