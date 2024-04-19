import { avatarConfig } from '@/config'

// 解析用户信息
export const parseUserInfo = (resData) => {
  // 处理头像
  let avatar
  // 拼接头像完整地址（如果有）
  if (resData.avatar) {
    // 创建基础 URL 对象
    const baseURL = new URL(avatarConfig.baseURL)
    // 将用户头像路径添加到基础 URL 的路径中
    baseURL.pathname += resData.avatar
    // 保存完整的 URL
    avatar = `${avatarConfig.baseURL}/${resData.avatar}`
  } else {
    // 没有时则为默认头像
    avatar = avatarConfig.defaultAvatar
  }

  // 处理昵称去除首尾空格
  let nickname =
    typeof resData.nickname === 'string' ? resData.nickname.trim() : ''
  // 如果昵称为空或不是字符串，则显示username
  nickname = nickname || resData.username

  // 处理简介去除首尾空格
  const bio = typeof resData.bio === 'string' ? resData.bio.trim() : ''
  // 处理联系方式去除首尾空格
  const contact_info =
    typeof resData.contact_info === 'string' ? resData.contact_info.trim() : ''

  // 处理帮助用户相关信息，从json字符串转为js对象
  let helping_users = []
  let helped_users = []
  let helping_by_users = []
  let helped_by_users = []
  try {
    helping_users = JSON.parse(resData.helping_users)
  } catch (error) {
    console.warn('Error parsing helping_users JSON:', error)
  }
  try {
    helped_users = JSON.parse(resData.helped_users)
  } catch (error) {
    console.warn('Error parsing helped_users JSON:', error)
  }
  try {
    helping_by_users = JSON.parse(resData.helping_by_users)
  } catch (error) {
    console.warn('Error parsing helping_by_users JSON:', error)
  }
  try {
    helped_by_users = JSON.parse(resData.helped_by_users)
  } catch (error) {
    console.warn('Error parsing helped_by_users JSON:', error)
  }

  // 返回一个新对象，对用户可以自定义的信息，转义特殊字符（也可以不用）
  return {
    id: resData.id,
    username: resData.username,
    email: resData.email,
    nickname,
    avatar,
    contact_info,
    bio,
    registered_at: resData.registered_at,
    last_login: resData.last_login,
    account_status: resData.account_status,
    e5_subscription_date: resData.e5_subscription_date,
    e5_expiration_date: resData.e5_expiration_date,
    helping_users,
    helped_users,
    helping_by_users,
    helped_by_users
  }
}

// 解析用户通知
export const parseUserNotification = (resData) => {
  let notifications = []
  try {
    notifications = JSON.parse(resData.notifications)
  } catch (error) {
    console.warn('Error parsing notifications JSON:', error)
  }
  return notifications
}
