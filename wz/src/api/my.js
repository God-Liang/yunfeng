import request from '@/utils/request'

// 我的列表
export function getList (query) {
  return request({
    url: '/api/hcsl/order/list',
    method: 'get',
    params: query
  })
}

// 催促发货
export function hurryorder (data) {
  return request({
    url: '/api/hcsl/order/hurryorder',
    method: 'post',
    data
  })
}

// 取消订单
export function del (data) {
  return request({
    url: '/api/hcsl/order/del',
    method: 'post',
    data
  })
}

// 确认收货
export function okorder (data) {
  return request({
    url: '/api/hcsl/order/okorder',
    method: 'post',
    data
  })
}

// 审核通过
export function shorder (data) {
  return request({
    url: '/api/hcsl/order/shorder',
    method: 'post',
    data
  })
}

// 审核不通过
export function noshorder (data) {
  return request({
    url: '/api/hcsl/order/noshorder',
    method: 'post',
    data
  })
}
