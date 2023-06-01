import axios from 'axios'
// import Vue from 'vue'

// export default function request () {
//   const http = axios.create({
//     baseURL: 'http://127.0.0.1:5000/'
//   })
//   http.interceptors.request.use(config => {
//     const token = localStorage.getItem('token')
//     console.log(token)
//     if (token) {
//       console.log(token)
//       config.headers.Authorization = token
//     }
//     return config
//   }, error => {
//     // 处理请求错误
//     return Promise.reject(error)
//   })
//   // // 在 Vue 原型中添加 $http 方法
//   // Vue.prototype.$http = http
// }// php密码 hFSM2mT/eyhRoQNj

axios.create({
  baseURL: 'http://127.0.0.1:5000/'
})
// axios.header('Access-Control-Allow-Origin: *')
axios.interceptors.request.use(config => {
  const Local = localStorage.getItem('token')
  console.log(1111)
  console.log(Local)
  const tokenA = JSON.parse(Local) || ''
  console.log(tokenA)
  const token = tokenA.token || ''
  if (token) {
    config.headers.Authorization = tokenA.token
  } else {
    console.log('需要设置拦截器')
  }
  return config
}, error => {
  // 处理请求错误
  return Promise.reject(error)
})
// // 在 Vue 原型中添加 $http 方法
// Vue.prototype.$http = http
export default axios
