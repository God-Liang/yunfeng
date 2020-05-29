import axios from 'axios'
import router, {
  resetRouter
} from '@/router'
import {
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken,
  removeToken
} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 30 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (!res.success) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 1000 * 3
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 1102 || res.code === 1101 || res.code === 1100) {
        // to re-login
        store.dispatch('user/resetToken').then(() => {
          setTimeout(() => {
            location.reload()
          }, 1500)
        })
      }
      // return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    console.log(error.response.status)

    if (error.response.status === 403 || error.response.status === 401 || error.response.status === 400) {
      // router.replace({
      //   name: 'login'
      // })
      Message({
        message: '用户信息失效，请重新登录',
        type: 'error',
        duration: 3 * 1000
      })
      router.push({
        path: '/login'
      })
      removeToken()
      resetRouter()
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
