import request from '@/utils/request'

// 获取用户管理左侧树
export function getOrgTree() {
  return request({
    url: '/user/getOrgTree',
    method: 'get'
  })
}
// 通过用户获取所属角色
export function getUserRole(id) {
  return request({
    url: `user/roles/${id}`,
    method: 'get'
  })
}
// 获取权限管理左侧树
export function getTreeData() {
  return request({
    url: '/permission/getPermissionTree',
    method: 'get'
  })
}
// 获取字典管理左侧树
export function getDicTypeTree() {
  return request({
    url: '/dictionaryType/getDicTypeTree',
    method: 'get'
  })
}
// 获取角色管理左侧树
export function getPermissionsTree(id) {
  return request({
    url: '/getRolePermissionTree',
    method: 'get',
    params: { roleId: id }
  })
}
// 修改权限
export function updatePermission(data, id) {
  return request({
    url: '/updateRolePermission',
    method: 'post',
    params: { roleId: id },
    data
  })
}

// 手术表
export function getOperationList(keyWord) {
  return request({
    url: '/operation/operationList',
    method: 'get',
    params: { keyWord: keyWord }
  })
}

// 获取所有可选择的表单列表
export function getFormList(params) {
  return request({
    url: `/template/getTemplate/${params.type}/${params.formTypes}`,
    method: 'get',
    params: {}
  })
}

// 获取历史版本量表
export function getVersionList(data) {
  return request({
    url: `/template/getVersionList/${data.id}/${data.templateNumber}`,
    method: 'get',
    params: {}
  })
}

// 获取历史版本方案
export function getVersionPlan(data) {
  return request({
    url: `/followupSolution/getVersionList/${data.id}/${data.solutionNumber}`,
    method: 'get',
    params: {}
  })
}

// 获取所有科室
export function getDepartments() {
  return request({
    url: '/adminHospitalDepartment/binaryTree',
    method: 'get',
    params: {}
  })
}
// 获取省市区
export function getAreaList(data) {
  return request({
    url: '/area/getList',
    method: 'post',
    data
  })
}
