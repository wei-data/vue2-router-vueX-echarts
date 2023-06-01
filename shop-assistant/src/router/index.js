import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/LogIn'
  },
  {
    path: '/LogIn',
    name: 'LogIn',
    component: () => import(/* webpackChunkName: "Home" */ '../views/LogIn.vue')
  },
  {
    path: '/Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
    meta: { title: '管理系统' },
    children: [{
      path: '',
      redirect: 'Index'
    },
    {
      path: 'Index',
      name: 'index',
      meta: { title: '后台首页' },
      component: () => import('../views/index/index.vue')
    },
    {
      path: 'OrderManagement',
      name: 'orderManagement',
      meta: { title: '订单管理' },
      component: () => import('../views/OrderManagement/OrderManagement.vue')
    },
    {
      path: 'ProList',
      name: 'ProList',
      meta: { title: '商品列表', module: '商品管理' },
      component: () => import('../views/ProManagement/ProList.vue')
    },
    {
      path: 'ProAdd',
      name: 'ProAdd',
      meta: { title: '商品添加', module: '商品管理' },
      component: () => import('../views/ProManagement/ProAdd.vue')
    },
    {
      path: 'ProClassification',
      name: 'ProClassification',
      meta: { title: '商品分类', module: '商品管理' },
      component: () => import('../views/ProManagement/ProClassification.vue')
    },
    {
      path: 'shopManagement',
      name: 'shopManagement',
      meta: { title: '店铺管理' },
      component: () => import('../views/ShopManagement/shopManagement.vue')
    },
    {
      path: 'AccountList',
      name: 'AccountList',
      meta: { title: '账户管理' },
      component: () => import('../views/AccountManagement/AccountList.vue')
    },
    {
      path: 'AddAccount',
      name: 'AddAccount',
      meta: { title: '账户管理' },
      component: () => import('../views/AccountManagement/AddAccount.vue')
    },
    {
      path: 'ChangePassword',
      name: 'ChangePassword',
      meta: { title: '账户管理' },
      component: () => import('../views/AccountManagement/ChangePassword.vue')
    },
    {
      path: 'ProStatistics',
      name: 'ProStatistics',
      meta: { title: '商品统计', module: '销售统计' },
      component: () => import('../views/SalesStatistics/ProStatistics.vue')
    },
    {
      path: 'OrderStatistics',
      name: 'OrderStatistics',
      meta: { title: '订单统计', module: '销售统计' },
      component: () => import('../views/SalesStatistics/OrderStatistics.vue')
    },
    {
      path: 'IndividualCenter',
      name: 'IndividualCenter',
      meta: { title: '个人中心' },
      component: () => import('../views/IndividualCenter.vue')
    }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.localStorage.getItem('token') // 获取token值
  if (!tokenStr) return next('/login')
  next()
})
export default router
