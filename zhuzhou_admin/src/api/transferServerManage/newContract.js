import request from '@/utils/request'

// 新签约列表
export function list(query) {
  return request({
    url: `/transferTeratment/myAuditList/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      keyword: query.keyword,
      signedStatus: query.signedStatus,
      signType: query.signType
    }
  })
}

// 通过拒绝
export function operate(data) {
  return request({
    url: '/transferTeratment/signAudit/',
    method: 'post',
    data
  })
}
