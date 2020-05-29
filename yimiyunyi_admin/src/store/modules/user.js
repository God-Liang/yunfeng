import {
  login,
  logout,
  getInfo,
  getPermissionByUserId,
  refreshToken
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import router, {
  resetRouter
} from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  permissionRouter: [],
  orgName: '',
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ORGNAME: (state, orgName) => {
    state.orgName = orgName
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        const data = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const data = response

        if (!data) {
          reject('暂无该用户～')
        }
        const {
          name,
          avatar,
          orgName
        } = data.user
        // roles must be a non-empty array
        // commit('SET_ROLES', roles)
        commit('SET_USERINFO', data.user)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ORGNAME', orgName)
        commit('SET_INTRODUCTION', '阿啦啦啦阿拉')
        getPermissionByUserId().then(res => {
          const permissionRouter = res.list
          if (!permissionRouter || permissionRouter.length <= 0) {
            reject('暂无权限，请联系相关人员～')
          }
          data.user.permissionRouter = permissionRouter
          commit('SET_ROLES', permissionRouter)
          resolve(data)
        })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then((res) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // refresh token
  refreshToken({
    commit
  }) {
    return new Promise((resolve, reject) => {
      refreshToken().then(response => {
        console.log(response)
        const data = response.data
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // dynamically modify permissions
  changeRoles({
    commit,
    dispatch
  }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'
      commit('SET_TOKEN', token)
      setToken(token)

      const {
        roles
      } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {
        root: true
      })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, {
        root: true
      })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
