import request from '@/utils/request'

export function getCount() {
  return request({
    url: '/myhome/count',
    method: 'get'
  })
}

// export function getMyFollowup(data) {
//   return request({
//     url: '/myhome/getMyFollowup',
//     method: 'get',
//     params: data
//   })
// }
// 我的随访表格
export function getMyFollowup(query) {
  return request({
    url: `/followup/myFollowPatient/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      followupType: query.followupType,
      startDate: query.startDate,
      endDate: query.endDate,
      searchType: query.searchType,
      keywords: query.keywords
    }
  })
}

export function cancelFollowup(id) {
  return request({
    url: `/myhome/cancelFollowup/${id}`,
    method: 'get'
  })
}

export function myHome() {
  return request({
    url: '/myHomeCommunity/',
    method: 'get'
  })
}
// 机构名称
export function organizationName(query) {
  return request({
    url: '/hospitalInfo/page/1/9999',
    method: 'get',
    params: {
      signType: query.signType
    }
  })
}
// 注册
export function signUp(data) {
  return request({
    url: '/signUp',
    method: 'post',
    data
  })
}
// 验证码
export function getAuthCode(data) {
  return request({
    url: '/sendConfirmSms',
    method: 'post',
    data,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}
// 验证短信验证码
export function verification(query) {
  return request({
    url: '/checkConfirmSms',
    method: 'get',
    params: {
      phone: query.phone,
      code: query.code
    }
  })
}

// 找回密码
export function getPass(data) {
  return request({
    url: '/forgetPass',
    method: 'post',
    data
  })
}
// 用户名校验
export function checkUserIsExist(query) {
  return request({
    url: '/checkUserIsExist',
    method: 'get',
    params: query
  })
}
