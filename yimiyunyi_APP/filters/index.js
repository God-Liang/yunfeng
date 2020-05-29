/**
 * Created by LG on 2019/10/21.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
	if (arguments.length === 0) {
		return null
	}
	if (time === null) {
		return null
	}
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if (time.indexOf('-') > 0) {
			time = time.replace(/-/g, '/')
		}
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
	if (('' + time).length === 10) {
		time = parseInt(time) * 1000
	} else {
		time = +time
	}
	const d = new Date(time)
	const now = Date.now()

	const diff = (now - d) / 1000

	if (diff < 30) {
		return '刚刚'
	} else if (diff < 3600) {
		// less 1 hour
		return Math.ceil(diff / 60) + '分钟前'
	} else if (diff < 3600 * 24) {
		return Math.ceil(diff / 3600) + '小时前'
	} else if (diff < 3600 * 24 * 2) {
		return '1天前'
	}
	if (option) {
		return parseTime(time, option)
	} else {
		return (
			d.getMonth() +
			1 +
			'月' +
			d.getDate() +
			'日' +
			d.getHours() +
			'时' +
			d.getMinutes() +
			'分'
		)
	}
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function teamTime(time) {
	if (!time) {
		return false
	}
	const time_r = parseTime(time, '{y}-{m}-{d}')
	const time_num = new Date(time_r + ' 00:00:00').getTime() / 1000
	const curTime_num = new Date().getTime() / 1000
	const diff = curTime_num - time_num
	if (diff < 86400) {
		if (diff < 0) {
			return parseTime(time, '{y}-{m}-{d}')
		} else {
			return parseTime(time, '{h}:{i}')
		}
	} else if (diff < 86400 * 2) {
		return '昨天'
	} else {
		return parseTime(time, '{y}-{m}-{d}')
	}
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
	url = url == null ? window.location.href : url
	const search = url.substring(url.lastIndexOf('?') + 1)
	const obj = {}
	const reg = /([^?&=]+)=([^?&=]*)/g
	search.replace(reg, (rs, $1, $2) => {
		const name = decodeURIComponent($1)
		let val = decodeURIComponent($2)
		val = String(val)
		obj[name] = val
		return rs
	})
	return obj
}
/**
 * 通过出生日期获取年龄
 * @param {string} birthday
 * @returns {Number}
 */
export function getAge(birthday) {
	if (!birthday) {
		return '0'
	}
	// 出生日期
	const start = new Date(birthday).getFullYear();
	// 当前日期
	const end = new Date().getFullYear();
	const age = end - start
	return age >= 0 ? age : '0'
}

/**
 * 通过开始时间、结束时间获取中间天数
 * @param {string} birthday
 * @returns {Number}
 */
export function getBetweenDay(startTime, endTime) {
	const starts = new Date(startTime).getTime()
	const ends = new Date(endTime).getTime()
	const days = (ends - starts) / 1000 / 60 / 60 / 24
	return days > 0 ? days : 0
}

/**
 * 获取名称最后两字
 * @param {string} name
 * @returns {Number}
 */
export function interception(name) {
	if (!name) {
		return null
	}
	let str
	if (name.length >= 2) {
		str = name.substr(name.length - 2, 2)
	} else {
		str = name
	}
	return str
}

/**
 * 获取名称前八个字符
 * @param {string} name
 * @returns {Number}
 */
export function cutOutTitle(name) {
	let str
	if (name.length > 8) {
		str = name.substr(0, 8) + '...'
	} else {
		str = name
	}
	return str
}

/**
 * 过滤就诊类型
 * @param {Number} type
 */
export function filterVisitType(type) {
	const typeArr = [{
			text: '手术',
			value: 0
		},
		{
			text: '初诊',
			value: 1
		},
		{
			text: '复诊',
			value: 2
		},
		{
			text: '体检',
			value: 3
		}
	]
	let typeShow
	typeArr.forEach(v => {
		if (v.value === type) {
			typeShow = v.text
		}
	})
	return typeShow
}

/**
 * 录音时间处理
 * @param {Number} time
 * @returns {String}
 */
export function recordTime(time) {
	let str
	if (time < 10) {
		str = '0:0' + time
	} else if (time === 60) {
		str = '1:00'
	} else {
		str = '0:' + time
	}
	return str
}

/**
 * 消息时间处理
 * @param {Number} time
 * @returns {String}
 */
export function messageTime(data) {
	if (!data || arguments.length === 0) {
		return null
	}
	if (data.indexOf('-') > 0) {
		data = data.replace(/-/g, '/')
	}
	const curStr = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate()
	const curTime = new Date(curStr).getTime()
	const introStr = new Date(data).getFullYear() + '/' + (new Date(data).getMonth() + 1) + '/' + new Date(data).getDate()
	const introTime = new Date(introStr).getTime()
	const iday = (curTime - introTime) / 1000 / 60 / 60 / 24
	if (iday < 1) {
		return parseTime(data, '{h}:{i}')
	} else if (iday >= 1 && iday < 2) {
		return '昨天'
	} else if (iday >= 2 && iday < 3) {
		return '前天'
	} else {
		return parseTime(data, '{m}-{d}')
	}
}
