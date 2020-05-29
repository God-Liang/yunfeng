import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import { constantRouterMap } from './modules/yimiviewConstRouter'

export { doctorSystemRouter } from './modules/doctorSystem/doctorSystem'
export { authorityManageRouter } from './modules/authorityManage/authorityManage'
export { asyncRouterMap } from './modules/yimiview/yimiviewsRouter'
export { constantRouterMap } from './modules/yimiviewConstRouter'
export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

