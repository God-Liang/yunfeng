import request from '@/utils/request'

// 获取我的申领车数据
export function getMyCarts () {
  return request({
    url: '/api/car/list',
    method: 'get',
    params: {}
  })
}

// 删除申领车某个数据
export function removeCarts (data) {
  return request({
    url: '/api/car/delete',
    method: 'post',
    data
  })
}

// 结算申领车
export function save (data) {
  return request({
    url: '/api/hcsl/order',
    method: 'post',
    data
  })
}
