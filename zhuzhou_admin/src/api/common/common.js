import request from '@/utils/request'

// 用关键词查询获取科室列表
export function getOrganizationList(query) {
  return request({
    url: '/organization/list',
    method: 'get',
    params: query
  })
}

// 根据类型关键字获取用户列表
export function getDoctorList(query) {
  return request({
    url: '/user/operation/list',
    method: 'get',
    params: query
  })
}

// 获取手术列表
export function getOperationList(query) {
  return request({
    url: '/operation/list',
    method: 'get',
    params: query
  })
}
// 地址
export function getAreaList(query) {
  return request({
    url: '/area/list',
    method: 'get',
    params: query
  })
}

// 获取机构内的科室
export function getSectionList(query) {
  return request({
    url: '/department/select',
    method: 'get',
    params: query
  })
}

// 获取手术列表
export function getDiagnosis(query) {
  return request({
    url: `/icd10/page/${query.page}/${query.limit}`,
    method: 'get',
    params: query
  })
}

// 审核校验
export function getPermission(query) {
  return request({
    url: '/appointmentRegister/operate/permission',
    method: 'get',
    params: query
  })
}

// 从his获取患者基本信息
export function getHisBaseInfo(query) {
  return request({
    url: '/patient/hisPatient',
    method: 'get',
    params: query
  })
}

// 从his系统获取检验信息
export function getHisInspectInfo(query) {
  return request({
    url: '/patient/hisInspect',
    method: 'get',
    params: query
  })
}
