import request from '@/utils/request'

// 医生列表
export function pending(query) {
  return request({
    url: `/user/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      keywords: query.keywords
    }
  })
}

// 新建/编辑表单提交
export function postForm(query) {
  return request({
    url: '/user/save',
    method: 'post',
    data: query
  })
}

// 删除
export function remove(query) {
  return request({
    url: `/user/delete/${query.id}`,
    method: 'post',
    params: query
  })
}

