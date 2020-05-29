import request from '@/utils/request'

// 分享量表、宣教
export function shareTemplate(data) {
  return request({
    url: '/template/share',
    method: 'post',
    data
  })
}

// 分享方案
export function shareSolution(data) {
  return request({
    url: `/followupSolution/share/${data.id}/${data.scope}`,
    method: 'get'
  })
}
