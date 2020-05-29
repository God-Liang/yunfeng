import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/unit/list',
    method: 'post',
    data
  })
}

export function info(data) {
  return request({
    url: '/unit/info',
    method: 'post',
    data
  })
}
export function info2(data) {
  return request({
    url: '/unit/info2',
    method: 'post',
    data
  })
}
export function update(data) {
  return request({
    url: '/unit/update',
    method: 'post',
    data
  })
}
export function operation(data) {
  return request({
    url: '/unit/operation',
    method: 'post',
    data
  })
}
