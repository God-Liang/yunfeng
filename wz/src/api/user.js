import request from '@/utils/request'

// 登陆
export function login (query) {
  return request({
    url: '/api/cas/testlogin',
    method: 'get',
    params: query
  })
}

// 第三方登陆
export function loginByThirdparty (query) {
  return request({
    url: '/api/cas/ddlogin',
    method: 'get',
    params: query
  })
}
// 第三方登陆
export function loginWx (params) {
  return request({
    url: '/api/cas/getwxuserid',
    method: 'get',
    params: params
  })
}
