// timeUtils.js

/**
 * 将时间字符串转换为本地时间格式
 * @param {(string|Date)} time 时间字符串或Date对象，例如 "2024-02-29T10:05:34.089Z"
 * @returns {string} 格式化后的本地时间字符串，例如 "2024-02-29 10:05"
 */
export const formatTime = (time) => {
  const date = new Date(time)

  // 检查日期对象是否有效
  if (Number.isNaN(date.getTime())) {
    return null
  }

  const localTime = date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // 使用24小时制
  })
  // 将日期格式从 "yyyy/MM/dd" 改为 "yyyy-MM-dd"
  return localTime.replace(/\//g, '-')
}

/**
 * 将时间字符串转换为本地日期字符串
 * @param {(string|Date)} time 时间字符串或Date对象，例如 "2024-02-29T10:05:34.089Z"
 * @returns {string} 格式化后的本地日期字符串，例如 "2024-02-29"
 */
export const formatDate = (time) => {
  const date = new Date(time)

  // 检查日期对象是否有效
  if (Number.isNaN(date.getTime())) {
    return null
  }

  const localDate = date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  // 将日期格式从 "yyyy/MM/dd" 改为 "yyyy-MM-dd"
  return localDate.replace(/\//g, '-')
}
