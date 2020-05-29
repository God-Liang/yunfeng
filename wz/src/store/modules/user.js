/* eslint-disable prefer-promise-reject-errors */
import { login, loginByThirdparty } from '@/api/user'
import { getMyCarts } from '@/api/carts'
import {
  getToken,
  setToken,
  removeToken,
  removeDdCode
} from '@/utils/auth'
const user = {
  state: {
    user: '',
    token: getToken(),
    cartsInfo: [],
    status: 5
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_CARTSINFO: (state, cartsInfo) => {
      state.cartsInfo = cartsInfo
    },
    SET_STATUS: (state, status) => {
      state.status = status
    }
  },

  actions: {
    // 用户名登录
    Login ({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.data)
          setToken(response.data.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetCarts ({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getMyCarts().then(response => {
          if (response.data.success) {
            const data = response.data
            commit('SET_CARTSINFO', data.data)
          } else {
            this.$toast.fail(response.data.msg)
            removeToken()
            location.reload()
          }
          resolve(response)
        })
      })
    },

    // 第三方验证登录(钉钉)
    LoginByThirdparty ({ commit }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_CODE', code)
        loginByThirdparty({ code: code }).then(response => {
          if (response.data.success) {
            commit('SET_TOKEN', response.data.data.token)
            setToken(response.data.data.token)
          } else {
            removeDdCode()
            this.$toast.fail(response.data.msg)
            location.reload()
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
