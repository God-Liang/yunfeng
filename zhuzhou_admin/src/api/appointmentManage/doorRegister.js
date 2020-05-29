import request from '@/utils/request'

// 门诊登记
export function save(data) {
  return request({
    url: '/outPatientApply/save',
    method: 'post',
    data: data
  })
}

// 获取麻醉方式二级子选项
export function getSecond(id) {
  return request({
    url: '/dictionary/getChildren',
    method: 'get',
    params: {
      parentId: id,
      type: 'mzlb'
    }
  })
}

