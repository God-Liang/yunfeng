import request from '@/utils/request'

// 列表
export function pending(query) {
  return request({
    url: `/bed/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      wardId: query.wardId,
      keyword: query.keywords
    }
  })
}

// 提交表单
export function postForm(query) {
  return request({
    url: '/bed/save',
    method: 'post',
    data: query
  })
}

// 删除
export function remove(query) {
  return request({
    url: `/bed/delete/${query.id}`,
    method: 'post'
  })
}

export function bedSelect(query) {
  return request({
    url: `/bed/bedSelect`,
    method: 'get',
    params: query
  })
}

// 病房查询
export function wardSelect() {
  return request({
    url: '/ward/select',
    method: 'post',
    data: {}
  })
}

// 新增病房
export function wardCreate(data) {
  return request({
    url: '/ward/create',
    method: 'post',
    data
  })
}

// 编辑病房
export function wardUpdate(data) {
  return request({
    url: '/ward/update',
    method: 'post',
    data
  })
}

// 删除病房
export function wardDelete(id) {
  return request({
    url: `/ward/delete/${id}`,
    method: 'post',
    data: {}
  })
}

// 获取某条病房数据
export function wardRead(id) {
  return request({
    url: `/ward/read/${id}`,
    method: 'get',
    params: {}
  })
}
