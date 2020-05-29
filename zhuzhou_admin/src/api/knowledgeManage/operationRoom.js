import request from '@/utils/request'

// 列表
export function pending(query) {
  return request({
    url: `/optRoom/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      optRoomType: query.optRoomType,
      keywords: query.keywords
    }
  })
}

// 提交表单
export function postForm(query) {
  return request({
    url: '/optRoom/save',
    method: 'post',
    data: query
  })
}

// 删除
export function remove(query) {
  return request({
    url: `/optRoom/delete/${query.id}`,
    method: 'post'
  })
}

// 字典列表
export function dictionary(query) {
  return request({
    url: '/dictionary/select',
    method: 'get',
    params: query
  })
}
