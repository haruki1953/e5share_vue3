// 解析动态数据
export const parsePostsInfo = (resData) => {
  const posts = JSON.parse(resData)
  // 确保为数组
  if (Array.isArray(posts)) {
    return posts
  }
  return []
}
