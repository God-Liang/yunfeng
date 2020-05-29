import request from '@/utils/request'

// 基本信息
export function getBaseInfo(appointId) {
  return request({
    url: `/patient/baseInfo/${appointId}`,
    method: 'get',
    params: {}
  })
}

// 医疗档案门诊信息
export function getArchives(appointId) {
  return request({
    url: `/patient/outHospInfo/${appointId}`,
    method: 'get',
    params: {}
  })
}

// 医疗档案住院信息
export function getInHospInfo(appointId) {
  return request({
    url: `/patient/inHospInfo/${appointId}`,
    method: 'get',
    params: {}
  })
}

// 随访任务
export function getFollowupTask(query) {
  return request({
    url: `/followup/all/page/${query.page}/${query.limit}`,
    method: 'get',
    params: query
  })
}

// 随访记录
export function getFollowupFinish(query) {
  return request({
    url: `/followup/finish/page/${query.page}/${query.limit}`,
    method: 'get',
    params: query
  })
}

// 宣教记录
export function getEduRecord(query) {
  return request({
    url: `/patient/eduRecord/page/${query.page}/${query.limit}`,
    method: 'get',
    params: query
  })
}

// 新增随访任务
export function addFollowup(data) {
  return request({
    url: '/followup/addFollowup',
    method: 'post',
    data
  })
}

// 短信记录
export function getSmsRecord(query) {
  return request({
    url: `/patient/smsRecord/page/${query.page}/${query.limit}`,
    method: 'get',
    params: query
  })
}

// 新增随访任务
export function outDoms(data) {
  return request({
    url: '/outDoms',
    method: 'post',
    data
  })
}

// 基本信息修改
export function update(data) {
  return request({
    url: '/patient/baseInfo/update',
    method: 'post',
    data
  })
}
