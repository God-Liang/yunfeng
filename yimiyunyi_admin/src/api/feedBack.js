import request from '@/utils/request'

export function statistics() {
  return request({
    url: '/feedback/statistics',
    method: 'get'
  })
}
