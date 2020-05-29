export function parseTime (time, cFormat) {
  if (time && time.indexOf('-') > 0) {
    time = time.replace(/-/g, '/')
  }
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
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
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
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
  return timeStr
}

/**
 *
 * 获取字符串(str)的前/后${length}个字符
 * @param { String } str 字符串
 * @param { Number } length 获取的长度
 * @param { Boolean } isEnd 是否从末尾开始
 */
export function disposeStr (str, length, isStart) {
  let resultStr = ''
  const num = length || 2
  if (str && str.length > num) {
    if (isStart) {
      resultStr = str.substring(0, num)
    } else {
      resultStr = str.substring(str.length - num, str.length)
    }
  } else {
    resultStr = str
  }
  return resultStr
}
