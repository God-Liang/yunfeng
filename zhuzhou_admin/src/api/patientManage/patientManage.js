import request from '@/utils/request'

// 患者病人列表
export function pageList(query) {
  return request({
    url: `/patient/page/${query.page}/${query.limit}`,
    method: 'get',
    params: query
  })
}
