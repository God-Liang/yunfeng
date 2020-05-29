import request from '@/utils/request'

// 手术目录库列表
export function pending(query) {
  return request({
    url: `/operation/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      operationType: query.type,
      keywords: query.keywords
    }
  })
}

// 新建/编辑表单提交
export function postForm(query) {
  return request({
    url: '/operation/save',
    method: 'post',
    data: query
  })
}

// 删除
export function remove(query) {
  return request({
    url: `/operation/delete/${query.id}`,
    method: 'post'
  })
}

// 手术医生设置查询
export function optDoctorSearch(query) {
  return request({
    url: '/operation/getOperationDoctor',
    method: 'get',
    params: query
  })
}

// 手术医生设置保存
export function optDoctorSave(query) {
  return request({
    url: '/operation/saveOperationDoctor',
    method: 'post',
    data: query
  })
}

// 手术信息、手术随访规则信息查询
export function operationFollowup(query) {
  return request({
    url: '/operation/getOperationFollowup',
    method: 'get',
    params: query
  })
}

// 保存随访规则
export function saveFollowupRule(query) {
  return request({
    url: '/followupRule/save',
    method: 'post',
    data: query
  })
}

// 手术关联表单已选择列表
export function selOperationForm(query) {
  return request({
    url: `/followupForm/selPage/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      operationId: query.operationId
    }
  })
}

// 手术关联表单未选择列表
export function unSelOperationForm(query) {
  return request({
    url: `/followupForm/uSelPage/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      operationId: query.operationId,
      keywords: query.keywords
    }
  })
}

// 手术随访表单新增
export function addOperationForm(query) {
  return request({
    url: '/operationForm/saveOperationForm',
    method: 'post',
    data: query
  })
}

// 手术随访表单删除
export function delOperationForm(query) {
  return request({
    url: '/operationForm/delOperationForm',
    method: 'post',
    data: query
  })
}

// 手术医生设置查询
export function read(id, query) {
  return request({
    url: '/operation/read/' + id,
    method: 'get',
    params: query
  })
}

// 手术医生设置查询
export function getFollowupPlan(data) {
  return request({
    url: '/followupPlan/create',
    method: 'post',
    data
  })
}
