import request from '@/utils/request'

// 列表
export function pageList(query) {
  return request({
    url: `/operationCheckIn/page/${query.page}/${query.limit}`,
    method: 'get',
    params: query
  })
}
// 预送提交
export function update(data) {
  return request({
    url: '/operationCheckIn/update',
    method: 'post',
    data
  })
}

