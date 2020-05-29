import request from '@/utils/request'

// 列表
export function pending(query) {
  return request({
    url: `/dictionary/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      type: query.type,
      keyword: query.keywords
    }
  })
}

// 新建/编辑表单提交
export function postForm(query) {
  return request({
    url: '/dictionary/create',
    method: 'post',
    data: query
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

// 字典类型列表
export function dictionaryType() {
  return request({
    url: '/dictionaryType/select',
    method: 'get'
  })
}

// 新增字典类型
export function addDicType(query) {
  return request({
    url: '/dictionaryType/create',
    method: 'post',
    data: query
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

// 根据parentCode获取字典列表
export function getDictListByParent(query) {
  return request({
    url: '/dictionary/getChildren',
    method: 'get',
    params: query
  })
}
