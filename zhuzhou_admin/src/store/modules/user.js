import { loginByUsername, logout, getSystems, getSystemsMenu } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    systems: [],
    currentSystemId: '',
    hospital: '',
    nick: '',
    userId: '',
    hospitalId: null
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
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
    SET_SYSTEMS: (state, systems) => {
      state.systems = systems
    },
    SET_CURRENT_SYSTEM_ID: (state, currentSystemId) => {
      state.currentSystemId = currentSystemId
    },
    SET_HOSPITAL: (state, hospital) => {
      state.hospital = hospital || '默认医院名称'
    },
    SET_HOSPITALID: (state, hospitalId) => {
      state.hospitalId = hospitalId
    },
    SET_NICK: (state, nick) => {
      state.nick = nick
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.name.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.pass).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getSystems().then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          if (response.data.user) {
            commit('SET_USERID', response.data.user.id)
            commit('SET_NAME', response.data.user.name)
            commit('SET_NICK', response.data.user.nick)
            commit('SET_AVATAR', response.data.user.avatar)
            commit('SET_HOSPITALID', response.data.user.hospitalId)
            commit('SET_INTRODUCTION', response.data.user.introduction)
          }
          getSystemsMenu(response.data.systems.list[0].id).then(getSystemsMenu => {
            if (!getSystemsMenu.data) {
              reject('error')
            }
            response.data.roles = getSystemsMenu.data.menus
            resolve(response)
          })
          Cookies.set('systemId', response.data.systems.list[0].id)
          commit('SET_SYSTEMS', response.data.systems.list)
          commit('SET_CURRENT_SYSTEM_ID', response.data.systemId)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then((res) => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_CURRENT_SYSTEM_ID', '')
          commit('SET_SYSTEMS', [])
          removeToken()
          Cookies.remove('systemId')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch, state }, systemId) {
      return new Promise(resolve => {
        Cookies.set('systemId', systemId)
        commit('SET_CURRENT_SYSTEM_ID', systemId)
        const roles = state.roles
        dispatch('GenerateRoutes', { roles, systemId })
        resolve()
      })
    }
  }
}

export default user
