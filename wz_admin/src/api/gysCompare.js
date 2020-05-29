import request from '@/utils/request'

export function sync(data) {
  return request({
    url: '/gys/compare/sync',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/gys/compare/del',
    method: 'delete',
    data
  })
}

