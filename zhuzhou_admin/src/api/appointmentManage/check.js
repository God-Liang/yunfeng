import request from '@/utils/request'

// 中心核对列表详情
export function pageList(query) {
  return request({
    url: `/intoCenterCheck/page/${query.page}/${query.limit}`,
    method: 'get',
    params: query
  })
}

// 核对详情
export function checkDetail(id) {
  return request({
    url: '/intoCenterCheck/detail/' + id,
    method: 'get',
    params: {}
  })
}

// 保存资料核对
export function saveCheck(data) {
  return request({
    url: '/intoCenterCheck/save',
    method: 'post',
    data: data
  })
}

// 从字典中获取核对资料列表
export function readCheckList(data) {
  return request({
    url: '/intoCenterCheck/readCheckList',
    method: 'post',
    data: data
  })
}
