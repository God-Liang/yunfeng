import request from '@/utils/request'

// 列表
export function getList(query) {
  return request({
    url: `/user/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      keywords: query.keyWord,
      status: query.status,
      sex: query.sex,
      deptIds: query.deptIds
    }
  })
}

// 新建/编辑表单提交
export function save(query) {
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

// 角色
export function getRole(query) {
  return request({
    url: `/role/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      keywords: query.keywords
    }
  })
}
// 删除
export function updateStatus(query) {
  return request({
    url: `/user/updateStatus/${query.id}`,
    method: 'post',
    params: {
      status: query.status
    }
  })
}
// 获取人员对应的角色
export function getUserRoles(query) {
  return request({
    url: '/user/getUserRoles',
    method: 'get',
    params: query
  })
}

// 当前对应ID的机构名称
export function organizationRead(query) {
  return request({
    url: `/organization/read/${query.id}`,
    method: 'get',
    params: query
  })
}
// 获取所有科室树
export function getDepartmentList() {
  return request({
    url: '/department/tree',
    method: 'get',
    params: {}
  })
}
// 获取所有科室
export function getDepartmentSelect() {
  return request({
    url: '/department/list',
    method: 'get',
    params: {}
  })
}

// 新增科室
export function createDepartment(query) {
  return request({
    url: '/department/create',
    method: 'post',
    params: query
  })
}
// 更新科室
export function updateDepartment(query) {
  return request({
    url: '/department/update',
    method: 'post',
    params: query
  })
}

// 获取单个用户的信息
export function userRead(id) {
  return request({
    url: `/user/read/${id}`,
    method: 'get',
    params: {}
  })
}

// 获取用户信息列表
export function userSelect(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: {
      type: query.type,
      keyword: query.keyword
    }
  })
}

// 重置密码
export function resetPass(query) {
  return request({
    url: '/user/resetPassword',
    method: 'post',
    params: query
  })
}
