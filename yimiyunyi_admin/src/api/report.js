import request from '@/utils/request'

// 获取用户管理左侧树
export function readPdf(id) {
  return request({
    url: `/heartRecord/readPdf/${id}`,
    method: 'get'
  })
}
