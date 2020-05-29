import request from '@/utils/request'

// 获取分类列表
export function getkskf () {
  return request({
    url: '/api/hcsl/wzzx/getkskf',
    method: 'get',
    params: {}
  })
}

// 获取套餐列表
export function gettcxx (kfdm) {
  return request({
    url: '/api/hcsl/wzzx/gettcxx',
    method: 'get',
    params: {
      kfdm: kfdm
    }
  })
}

// 获取套餐详情列表
export function gettcmx (query) {
  return request({
    url: '/api/hcsl/wzzx/gettcmx',
    method: 'get',
    params: query
  })
}
