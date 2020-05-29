import router from './router'
import store from './store'
import {
  getToken,
  setDdCode,
  getDdCode,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  Toast
} from 'vant'
import {
  loginWx
} from '@/api/user'
import {
  getPathArgument
} from './filters'
import * as dd from 'dingtalk-jsapi'
router.beforeEach((to, from, next) => {
  /* 开发版本 */
  if (process.env.NODE_ENV === 'development') {
    if (getToken()) {
      // 获取购物车信息
      store.dispatch('GetCarts').then(() => {
        // 进入页面
        next()
      })
    } else {
      // 获取用户信息
      store.dispatch('Login').then((response) => {
        if (response.data.success) {
          // 获取购物车信息
          store.dispatch('GetCarts').then(() => {
            Toast.clear()
            next()
          })
        }
      })
    }
  } else {
    if (serverConfig.type === 'dd') {
      /* 钉钉微应用 */
      // 判断钉钉code
      if (getDdCode()) {
        // 判断用户code
        if (getToken()) {
          // 获取购物车信息
          store.dispatch('GetCarts').then(() => {
            if (to.path === serverConfig.path) {
              next('/')
            } else {
              next()
            }
          })
        } else {
          // 获取用户信息
          store.dispatch('LoginByThirdparty', getDdCode()).then(() => {
            // 获取购物车信息
            store.dispatch('GetCarts').then(() => {
              if (to.path === serverConfig.path) {
                next('/')
              } else {
                next()
              }
            })
          })
        }
      } else {
        // 重新获取token
        removeToken()
        // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
        dd.ready(function () {
          const corpId = getPathArgument('corpId')
          // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
          dd.runtime.permission.requestAuthCode({
            corpId: corpId,
            onSuccess: function (result) {
              setDdCode(result.code)
              // 通过code获取用户信息
              store.dispatch('LoginByThirdparty', result.code).then(() => {
                // 获取购物车信息
                store.dispatch('GetCarts').then(() => {
                  if (to.path === serverConfig.path) {
                    next('/')
                  } else {
                    next()
                  }
                })
              })
              /* {
            code: 'hYLK98jkf0m' //string authCode
        } */
            },
            onFail: function () {}
          })
        })
        dd.error(function (error) {
          /**
     {
        errorMessage:"错误信息",// errorMessage 信息会展示出钉钉服务端生成签名使用的参数，请和您生成签名的参数作对比，找出错误的参数
        errorCode: "错误码"
     }
    **/
          alert('dd error: ' + JSON.stringify(error))
        })
      }
    } else {
      /* 企业微信登录 */
      // 获取购物车信息
      if (getToken()) {
        // 获取购物车信息
        store.dispatch('GetCarts').then(() => {
          // 进入页面
          if (to.path === serverConfig.path) {
            next('/')
          } else {
            next()
          }
        })
      } else {
        if (!getPathArgument('code')) {
          let param = 'appid=' + serverConfig.appid
          param +=
            '&redirect_uri=' + encodeURIComponent(window.location.href)
          param += '&response_type=code'
          param += '&scope=snsapi_base&connect_redirect=1'
          param += '&state=123#wechat_redirect'
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?' + param
        } else {
          let data = {
            code: getPathArgument('code'),
            state: getPathArgument('state'),
            urlp: encodeURIComponent(window.location.href)
          }
          loginWx(data).then(res => {
            if (res.data.success) {
              store.commit('SET_TOKEN', res.data.data.utoken)
              setToken(res.data.data.utoken)
              store.dispatch('GetCarts').then(() => {
                // 进入页面
                if (to.path === serverConfig.path) {
                  next('/')
                } else {
                  next()
                }
              })
            } else {
              removeToken()
            }
          })
        }
      }
    }
  }
})

router.afterEach(() => {

})
