import request from '@/utils/request'

// 宣教库列表
export function page(query) {
  return request({
    url: `/healthEdu/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      type: query.type,
      keywords: query.keyword
    }
  })
}

// 编辑宣教库
export function postForm(data) {
  return request({
    url: '/healthEdu/save',
    method: 'post',
    data
  })
}
// 删除宣教库
export function remove(query) {
  return request({
    url: `/healthEdu/delete/${query.id}`,
    method: 'post',
    params: query
  })
}

// 通过ID获取某一个宣教内容
export function read(id) {
  return request({
    url: `/healthEdu/read/${id}`,
    method: 'get',
    params: {}
  })
}

// 获取宣教库列表
export function list(query) {
  return request({
    url: '/healthEdu/list',
    method: 'get',
    params: {
      type: query.type,
      keywords: query.keyword
    }
  })
}
