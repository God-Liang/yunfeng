import request from '@/utils/request'

// 流程路径
export function operationPath(id) {
  return request({
    url: '/path/operationPath',
    method: 'get',
    params: {
      id: id
    }
  })
}
