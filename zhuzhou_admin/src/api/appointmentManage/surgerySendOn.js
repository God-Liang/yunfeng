import request from '@/utils/request'

// 列表
export function pageList(query) {
  return request({
    url: `/operationConfirm/readyPage/${query.page}/${query.limit}`,
    method: 'get',
    params: query
  })
}

// 预送提交
export function update(data) {
  return request({
    url: '/operationConfirm/update',
    method: 'post',
    data
  })
}

// 手术排序
export function sortConfirm(data) {
  return request({
    url: '/operationConfirm/optOrder',
    method: 'post',
    data
  })
}
