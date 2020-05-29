import request from '@/utils/request'
// 登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function getPermissionByUserId() {
  return request({
    url: '/getPermissionByUserId',
    method: 'get',
    params: {}
  })
}
// 退出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
// 修改密码
export function amendPass(data) {
  return request({
    url: '/user/updatePwd',
    method: 'post',
    data
  })
}

export function refreshToken() {
  return request({
    url: '/refreshToken',
    method: 'get'
  })
}
