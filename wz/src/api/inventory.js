import request from '@/utils/request'

// 物资清单列表
export function hcslList (query) {
  return request({
    url: '/api/hcsl/wzzx/list',
    method: 'get',
    params: query
  })
}

// 获取某个物质的详情
export function hcslDetail (query) {
  return request({
    url: '/api/hcsl/wzzx/detail',
    method: 'get',
    params: query
  })
}

// 加入申领车
export function addCar (data) {
  return request({
    url: '/api/car',
    method: 'post',
    data
  })
}
