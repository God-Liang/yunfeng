import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },

  /** 详情页router **/
  {
    path: '/details',
    component: Layout,
    redirect: 'noRedirect',
    hidden: true,
    children: [
      {
        path: 'solving/:id',
        component: () => import('@/views/customerService/solving'),
        name: 'Solving',
        meta: { title: '处理' }
      },
      {
        path: 'lookMessage/:id',
        component: () => import('@/views/customerService/lookMessage'),
        name: 'LookMessage',
        meta: { title: '查看' }
      },
      {
        path: 'teamDetial/:id',
        component: () => import('@/views/operation/components/teamDetial'),
        name: 'TeamDetial',
        meta: { title: '团队详情' }
      },
      {
        path: 'doctorDetial/:id',
        component: () => import('@/views/operation/components/doctorDetial'),
        name: 'DoctorDetial',
        meta: { title: '医生详情' }
      },
      {
        path: 'planDetail/:id',
        component: () => import('@/views/operation/components/planDetail'),
        name: 'PlanDetail',
        meta: { title: '查看随访方案' }
      }
    ]
  },
  {
    path: '/formEditor',
    component: () => import('@/views/case/form'),
    hidden: true
  },
  {
    path: '/case',
    component: Layout,
    redirect: 'noRedirect',
    hidden: true,
    children: [
      {
        path: 'lookForm/:id',
        component: () => import('@/views/case/lookForm'),
        name: 'LookForm',
        meta: { title: '查看' }
      },
      {
        path: 'useForm/:id',
        component: () => import('@/views/case/useForm'),
        name: 'UseFormCase',
        meta: { title: '使用量表' }
      },
      {
        path: 'tinymce/:id',
        component: () => import('@/views/case/tinymce'),
        name: 'TinymceCase',
        meta: { title: '编辑宣教' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/systemManage',
    component: Layout,
    redirect: '/systemManage/role',
    alwaysShow: true, // will always show the root menu
    name: 'SystemManage',
    meta: {
      title: '系统管理',
      icon: 'component'
    },
    children: [
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role'),
        meta: { title: '角色管理', icon: 'password' }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user'),
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'permission',
        name: 'Permission',
        component: () => import('@/views/system/permission'),
        meta: { title: '权限管理', icon: 'nested' }
      },
      {
        path: 'dictionary',
        name: 'Dictionary',
        component: () => import('@/views/system/dictionary'),
        meta: { title: '字典管理', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
