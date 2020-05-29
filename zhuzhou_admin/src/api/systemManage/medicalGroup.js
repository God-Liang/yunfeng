import request from '@/utils/request'

// 新建医疗组
export function medicalCreate(query) {
  return request({
    url: '/medicalGroup/create',
    method: 'post',
    data: query
  })
}

// 编辑医疗组
export function medicalUpdate(data) {
  return request({
    url: '/medicalGroup/update',
    method: 'post',
    data
  })
}

// 删除医疗组
export function medicalDelete(id) {
  return request({
    url: `/medicalGroup/delete/${id}`,
    method: 'post',
    data: {}
  })
}

// 删除医疗组
export function medicalRead(id) {
  return request({
    url: `/medicalGroup/read/${id}`,
    method: 'get',
    params: {}
  })
}

// 医疗组列表
export function medicalGroupList(query) {
  return request({
    url: '/medicalGroup/select',
    method: 'get',
    params: query
  })
}

// 医疗组所属成员列表
export function medicalGroupUserList(query) {
  return request({
    url: `/medicalGroup/userSelect/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      medicalGroupId: query.id
    }
  })
}

// 未设置医疗组成员列表
export function medicalGroupUnUserList(query) {
  return request({
    url: `/medicalGroup/userUnSelect/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      keyword: query.keywords
    }
  })
}

// 新增医疗组成员
export function addMedicalGroupUser(query) {
  return request({
    url: '/medicalGroupUserRel/create',
    method: 'post',
    data: query
  })
}

// 删除医疗组成员
export function delMedicalGroupUser(query) {
  return request({
    url: '/medicalGroupUserRel/delete',
    method: 'post',
    data: query
  })
}
