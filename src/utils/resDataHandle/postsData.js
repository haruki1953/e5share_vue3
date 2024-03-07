// 解析动态数据
export const parsePostsInfo = (resData) => {
  const posts = JSON.parse(resData)
  return posts
}
