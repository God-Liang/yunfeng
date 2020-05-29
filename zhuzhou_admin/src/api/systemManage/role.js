import request from '@/utils/request'

// 列表
export function getList(query) {
  return request({
    url: `/role/page/${query.page}/${query.limit}`,
    method: 'get',
    params: query
  })
}

// 新建
export function create(query) {
  return request({
    url: '/role/create',
    method: 'post',
    params: query
  })
}

export function saveRolePermission(query) {
  return request({
    url: '/role/saveRolePermission',
    method: 'post',
    params: query
  })
}

// 更新
export function update(query) {
  return request({
    url: '/role/update',
    method: 'post',
    params: query
  })
}

// 查询某一条信息
export function read(id) {
  return request({
    url: `/role/read/${id}`,
    method: 'get',
    params: {}
  })
}

// 删除
export function remove(query) {
  return request({
    url: `/role/delete/${query.id}`,
    method: 'post',
    params: query
  })
}

// 获取角色权限
export function getPermissionsByRoleId(query) {
  return request({
    url: `/role/getPermissionsByRoleId`,
    method: 'get',
    params: query
  })
}

// 获取角色包括的用户
export function getRoleUsers(query) {
  return request({
    url: `/role/getRoleUsers/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      id: query.id,
      status: query.status,
      keyWord: query.keyWord
    }
  })
}

// 删除角色包括的用户
export function roleRemovePer(query) {
  return request({
    url: `/role/delete/${query.userId}/${query.roleId}`,
    method: 'post',
    params: {}
  })
}

// 获取角色下拉框数据
export function getRoleSelect() {
  return request({
    url: `/role/list`,
    method: 'get'
  })
}
