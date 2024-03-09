// timeUtils.js

/**
 * 将时间字符串转换为本地时间格式
 * @param {string} timeString 时间字符串，例如 "2024-02-29T10:05:34.089Z"
 * @returns {string} 格式化后的本地时间字符串，例如 "2024/02/29 10:05"
 */
export const formatTime = (timeString) => {
  const date = new Date(timeString)

  // 检查日期对象是否有效
  if (Number.isNaN(date.getTime())) {
    return 'N/A'
  }

  const localTime = date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // 使用24小时制
  })
  return localTime
}
