import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  base: process.env.NODE_ENV === 'development' ? '/' : serverConfig.url,
  routes: [{
    path: '/',
    name: 'Inventory',
    meta: {
      title: '物资清单'
    },
    component: () => import('@/views/Inventory.vue')
  },
  {
    path: '/package',
    name: 'Package',
    meta: {
      title: '物资套餐'
    },
    component: () => import('@/views/Package.vue')
  },
  {
    path: '/carts',
    name: 'Carts',
    meta: {
      title: '物资套餐'
    },
    component: () => import('@/views/Carts.vue')
  },
  {
    path: '/my',
    name: 'My',
    meta: {
      title: '物资套餐'
    },
    component: () => import('@/views/My.vue')
  },
  {
    path: '*',
    name: '404',
    component: Error,
    hidden: true
  }
  ]
})
