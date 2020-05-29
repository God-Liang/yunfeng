import request from '@/utils/request'

// 通过患者id获取默认关注团队信息
export function getDefaultTeamInfo (patientId) {
  return request({
    url: `/wxMyDoctor/getDefaultTeamInfo/${patientId}`,
    method: 'get',
    params: {}
  })
}

// 通过医生id获取医生信息
export function getDoctorInfo (id) {
  return request({
    url: `/wxMyDoctor/getDoctorInfo/${id}`,
    method: 'get',
    params: {}
  })
}

// 通过团队id、患者openId获取队员列表
export function getDoctorsTeam (teamId, openId) {
  return request({
    url: `/wxMyDoctor/getDoctorsTeam/${teamId}/${openId}`,
    method: 'get',
    params: {}
  })
}

// 通过团队id获取队员列表
export function getDoctors (teamId) {
  return request({
    url: `/wxMyDoctor/getDoctors/${teamId}`,
    method: 'get',
    params: {}
  })
}

// 通过患者id获取关注团队列表信息
export function getTeamList (patientId) {
  return request({
    url: `/wxMyDoctor/getTeamList/${patientId}`,
    method: 'get',
    params: {}
  })
}

// 通过患者id获取推荐关注团队列表信息
export function getMatchTeamList (patientId) {
  return request({
    url: `/wxMyDoctor/getMatchTeamList/${patientId}`,
    method: 'get',
    params: {}
  })
}

// 修改对团队的关注状态
export function updateFollowStatus (patientId, teamId, status) {
  return request({
    url: `/wxMyDoctor/updateFollowStatus`,
    method: 'get',
    params: {
      patientId: patientId,
      status: status,
      teamId: teamId
    }
  })
}

// 设置团队为默认团队
export function setDefaultTeam (patientId, teamId) {
  return request({
    url: `/wxMyDoctor/setDefaultTeam`,
    method: 'get',
    params: {
      patientId: patientId,
      teamId: teamId
    }
  })
}

//  通过id获取团队信息
export function getTeamInfo (id) {
  return request({
    url: `/wxMyDoctor/getTeamInfo/${id}`,
    method: 'get',
    params: {}
  })
}
