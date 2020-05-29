import request from '@/utils/request'

// 列表
export function getList(query) {
  return request({
    url: `/config/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      keywords: query.keywords
    }
  })
}

// 新建
export function save(query) {
  return request({
    url: '/config/save',
    method: 'post',
    params: query
  })
}
// 更新
export function update(query) {
  return request({
    url: '/config/update',
    method: 'post',
    params: query
  })
}
// 删除
export function remove(query) {
  return request({
    url: `/config/delete/${query.id}`,
    method: 'post',
    params: query
  })
}

