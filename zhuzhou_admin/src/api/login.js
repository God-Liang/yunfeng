import request from '@/utils/request'

export function loginByUsername(name, pass) {
  const data = {
    name,
    pass,
    pType: 1
  }
  return request({
    url: '/login',
    method: 'get',
    params: data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '/getUserInfo',
    method: 'get'
  })
}
export function getPersonCenter() {
  return request({
    url: '/getPersonCenter',
    method: 'get'
  })
}
export function getSystems() {
  return request({
    url: '/getSystems',
    method: 'get'
  })
}
export function getSystemsMenu(systemId) {
  return request({
    url: '/getSystemMenus',
    method: 'get',
    params: { systemId }
  })
}

export function eduRead(id) {
  return request({
    url: `/healthEdu/read/${id}`,
    method: 'get',
    params: {}
  })
}
