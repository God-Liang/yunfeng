import { constantRouterMap } from '@/router'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    btnRouters: [],
    secondaryJump: null
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_BTNROUTERS: (state, btnRouters) => {
      state.btnRouters = btnRouters
    },
    SET_SECONDARYJUMP: (state, secondaryJump) => {
      state.secondaryJump = secondaryJump
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let routerMap = []
        if (roles && roles.length > 0) {
          routerMap = mergeArray(roles).catalogs
          if (routerMap.filter((item, index, arr) => item.path === '').length === 0) {
            routerMap.unshift({
              path: '',
              component: 'Layout',
              redirect: 'home',
              name: 'controlBoard',
              meta: { title: '我的首页', icon: 'component' },
              children: [
                {
                  path: 'home',
                  component: 'views/dashboard/emptyIndex',
                  name: 'index',
                  meta: { title: '我的首页' }
                }
              ]
            })
          }
        }
        commit('SET_ROUTERS', routerMap)
        commit('SET_BTNROUTERS', mergeArray(roles).buttons)
        resolve()
      })
    }
  }
}
/**
 * 后端返回路由表数据处理
 * @param arr
 */
function mergeArray(arr) {
  const arr1 = arr.filter((item, index, arr) => item.type === 1) // 一级菜单数据
  const arr2 = arr.filter((item, index, arr) => item.type === 2) // 二级菜单数据
  const arr3 = arr.filter((item, index, arr) => item.type === 3) // 按钮数据
  arr1.forEach((v, i) => {
    arr1[i].children = []
    arr2.forEach((e, k) => {
      if (arr2[k].parentId === arr1[i].id) {
        arr1[i].children.push(arr2[k])
      }
    })
  })
  const roles = []
  arr1.forEach((v, i) => {
    const children = []
    v.children.forEach((vRen, iRen) => {
      children.push({
        path: vRen.uri,
        component: vRen.component,
        name: vRen.name,
        meta: {
          title: vRen.title,
          icon: v.alwaysShow ? v.icon : ''
        }
      })
    })
    roles.push({
      path: v.uri,
      component: v.component,
      redirect: v.redirect ? v.redirect : 'noredirect',
      name: v.name,
      alwaysShow: v.alwaysShow,
      meta: {
        title: v.title,
        icon: v.icon
      },
      children: children
    })
  })
  const rolesObj = {
    catalogs: roles,
    buttons: arr3
  }
  return rolesObj
}

export default permission
