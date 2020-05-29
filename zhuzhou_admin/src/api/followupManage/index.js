import request from '@/utils/request'

// 新建随访表单
export function addForm(query) {
  return request({
    url: '/form/add',
    method: 'get',
    params: query
  })
}

// 禁用表单类型
export function suspendForm(id) {
  return request({
    url: `/form/suspendForm/${id}`,
    method: 'get'
  })
}

// 获取随访列表
export function getList(query) {
  return request({
    url: `/followupForm/page/${query.page}/${query.limit}`,
    method: 'get'
  })
}

// 获取随访计划列表
export function getPlanList(query) {
  return request({
    url: `/followup/followPlan/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      status: query.status,
      operationId: query.type,
      keywords: query.keyword
    }
  })
}

// 获取随访计划患者信息列表
export function getPatientList(query) {
  return request({
    url: `/followup/followPatient/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      planId: query.planId,
      followupType: query.followType,
      searchType: query.type,
      keywords: query.keyWord
    }
  })
}

// 取消随访任务
export function cancelFollowup(query) {
  return request({
    url: `/followup/cancelFollowup/${query.id}`,
    method: 'post'
  })
}

// 获取随访患者明细信息
export function getFollowupDetail(query) {
  return request({
    url: `/followup/followDetail/${query.id}`,
    method: 'get'
  })
}

// 获取随访信息
export function getFollowResult(query) {
  return request({
    url: `/followup/followResult/${query.id}`,
    method: 'get'
  })
}

// 提交随访任务
export function submitFollowup(query) {
  return request({
    url: `/followup/submitFollowup`,
    method: 'post',
    data: query
  })
}

// 获取随访记录信息
export function followRecord(query) {
  return request({
    url: `/followup/followRecord/page/1/10`,
    method: 'get',
    params: query
  })
}

// 随访任务
export function taskPage(query) {
  return request({
    url: `/followup/all/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      appointId: query.appointId
    }
  })
}

// 随访记录
export function recordPage(query) {
  return request({
    url: `/followup/finish/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      appointId: query.appointId
    }
  })
}
