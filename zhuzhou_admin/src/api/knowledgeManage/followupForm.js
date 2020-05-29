import request from '@/utils/request'

// 未处理
export function page(query) {
  return request({
    url: `/followupForm/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      type: query.type,
      keywords: query.keyword
    }
  })
}
// 已处理
export function deleteForm(id) {
  return request({
    url: `/followupForm/delete/${id}`,
    method: 'post'
  })
}

// 获取记录
export function readForm(id) {
  return request({
    url: `/followupForm/read/${id}`,
    method: 'get'
  })
}

// 提交表单
export function postForm(query) {
  return request({
    url: '/followupForm/save',
    method: 'post',
    data: query
  })
}
