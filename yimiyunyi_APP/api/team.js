import { request } from '../utils/Request'

// 医生退出团队
export function quitTeam(data, fun) {
	return request({
	  url: '/teamPatient/quitTeam',
	  method: 'POST',
		data
	}, fun)
}

// 获取团队成员信息
export function readTeamMember(userId, teamId, fun) {
	return request({
	  url: `/teamMember/read/${userId}/${teamId}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 获取团队院内医生未加入团队列表分页
export function getDoctorList(data, fun) {
	const datas = {
		...data
	}
	delete datas.current
	delete datas.pageSize
	return request({
		url: `/AppDoctor/pageDoctor/${data.current}/${data.pageSize}`,
		method: 'GET',
		data: datas
	}, fun)
}

// 获取数据列表
export function getList(data, fun) {
	const datas = {
		...data
	}
	delete datas.current
	delete datas.pageSize
	return request({
		url: `/team/applyPage/${data.current}/${data.pageSize}`,
		method: 'GET',
		data: datas
	}, fun)
}

// 获取默认团队
export function getDefaultTeamInfo(doctorId, fun) {
	return request({
	  url: `/team/getDefaultTeamInfo/${doctorId}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 团队二维码
export function getTeamCode(code, fun) {
	return request({
	  url: 	`/qrcode/TeamCode/${code}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 二维码加入团队
export function setTeamCode(code, fun) {
	return request({
	  url: 	`/myCenter/scan/${code}`,
	  method: 'GET',
		data: {}
	}, fun)
}


// 获取团队成员信息
export function getTeamMemberInfo(data, fun) {
	return request({
	  url: '/teamMember/getOne',
	  method: 'POST',
		data: data
	}, fun)
}

// 设置默认团队
export function setDefaultTeam(teamId, teamName, fun) {
	return request({
	  url: `/AppDoctor/setDefaultTeam/${teamId}/${teamName}`,
	  method: 'POST',
		data: {}
	}, fun)
}

// 加入团队
export function joinTeam(data, fun) {
	return request({
	  url: '/teamMember/addOrUpdate',
	  method: 'POST',
		data: data
	}, fun)
}

// 成员退出
export function deleteMember(id, userId, teamId, fun) {
	return request({
	  url: `/teamMember/delete/${id}/${userId}/${teamId}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 审核成员
export function auditTeamMember(data, fun) {
	return request({
	  url: '/teamMember/teamMembers',
	  method: 'POST',
		data: data
	}, fun)
}

// 获取团队随访情况
export function planStatistics(teamId, planTimeType, fun) {
	return request({
	  url: `/team/planStatistics/${teamId}/${planTimeType}`,
	  method: 'GET',
		data: {}
	}, fun)
}
export function patientStatistics(teamId, fun) {
	return request({
	  url: `/team/patientStatistics/${teamId}`,
	  method: 'GET',
		data: {}
	}, fun)
}
export function templateStatistics(teamId, fun) {
	return request({
	  url: `/team/templateStatistics/${teamId}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 获取团队中患者的信息
export function getPatientInfo(id, fun) {
	return request({
	  url: `/patient/getOne/${id}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 获取患者管理统计
export function getStatistics(teamId, fun) {
	return request({
	  url: `/teamPatient/Statistics/${teamId}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 通过患者id获取病例相关科室
export function getDepartment(patientId, fun) {
	return request({
	  url: `/teamPatient/getDepartment/${patientId}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 团队消息全部变为已读
export function teamAllRead(teamId, parameterType, fun) {
	return request({
	  url: `/TeamMessageItem/readUpdateByIds/${parameterType}/${teamId}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 团队消息新成员已读
export function teamRead(teamId, parameterType, fun) {
	return request({
	  url: `/team/isRead/${teamId}/${parameterType}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 是否存在未读团队消息
export function isTeamMsg(teamId, fun) {
	return request({
	  url: `/TeamMessageInform/isMessage/${teamId}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 团队名称校验
export function teamVerify(teamName, fun) {
	return request({
	  url: `/team/teamVerify/${teamName}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 是否团队负责人
export function getLevel(teamId, fun) {
	return request({
	  url: `/team/getLevel/${teamId}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 患者更换医生
export function changeDoctor(data, fun) {
	return request({
	  url: `/teamPatient/changeDoctor/${data.patientId}/${data.doctorId}/${data.teamId}/${data.doctorName}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 获取未读新病人数量
export function readTipNumber(teamId, fun) {
	return request({
	  url: `/teamMember/readTipNumber/${teamId}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 新病人数量已读
export function emptyTipNumber(teamId, fun) {
	return request({
	  url: `/teamMember/emptyTipNumber/${teamId}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 判断当前医生是否申请过团队
export function isJoin(userId, fun) {
	return request({
	  url: `/teamMember/isJoin/${userId}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 发送邀请消息
export function sendMessage(userId, teamId, fun) {
	return request({
	  url: `/teamMember/sendMessage/${userId}/${teamId}`,
	  method: 'GET',
		data: {}
	}, fun)
}

// 成员退出团队审核
export function quitTeamVerifyStatus(doctorId, teamId, fun) {
	return request({
	  url: `/teamPatient/quitTeamVerifyStatus/${doctorId}/${teamId}`,
	  method: 'GET',
		data: {}
	}, fun)
}
