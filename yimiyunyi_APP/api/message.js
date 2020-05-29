import { request } from '../utils/Request'

// 标记某个已读
export function readUpdateById(id, fun) {
  return request({
    url: `/messageItem/readUpdateByid/${id}`,
    method: 'GET',
		data: {}
  }, fun)
}

// 标记某所有已读
export function readUpdateByIds(data, fun) {
  return request({
    url: '/messageItem/readUpdateByIds',
    method: 'GET',
		data: data
  }, fun)
}
// 随访申请同意/不同意
export function updateBindStatus(data, fun) {
	return request({
	  url: '/patient/UpdateBindStatus',
	  method: 'POST',
		data
	}, fun)
}

// 团队消息已读
export function updateTeamMsg(data, fun) {
	return request({
	  url: '/TeamMessageInform/update',
	  method: 'POST',
		data
	}, fun)
}

// 其他消息已读
export function updateMsg(data, fun) {
	return request({
	  url: '/messageInform/update',
	  method: 'POST',
		data
	}, fun)
}

// 是否存在新消息
export function isMessage(data, fun) {
	return request({
	  url: '/AllMessage/isMessage',
	  method: 'GET',
		data
	}, fun)
}