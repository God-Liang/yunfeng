import request from '@/utils/request'

// 列表
export function pending(query) {
  return request({
    url: `/message/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      remindType: query.type,
      keywords: query.keywords,
      patientId: query.patientId
    }
  })
}

// 新建/编辑表单提交
export function postForm(query) {
  return request({
    url: '/message/save',
    method: 'post',
    data: query
  })
}

// 删除
export function remove(query) {
  return request({
    url: `/message/delete/${query.id}`,
    method: 'post'
  })
}
