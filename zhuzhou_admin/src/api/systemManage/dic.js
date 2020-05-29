import request from '@/utils/request'

// 列表
export function getList(query) {
  return request({
    url: `/dictionary/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      keywords: query.keywords
    }
  })
}

// 新建/编辑表单提交
export function save(query) {
  return request({
    url: '/dictionary/create',
    method: 'post',
    params: query
  })
}
// 更新
export function update(query) {
  return request({
    url: '/dictionary/update',
    method: 'post',
    params: query
  })
}
// 删除
export function remove(query) {
  return request({
    url: `/dictionary/delete/${query.id}`,
    method: 'post',
    params: query
  })
}

