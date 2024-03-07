// import { escape } from 'lodash'
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

  // 处理昵称，如果没有时则为username
  const nickname = resData.nickname || resData.username

  // 处理帮助用户相关信息，从json字符串转为js对象
  const helping_users = JSON.parse(resData.helping_users)
  const helped_users = JSON.parse(resData.helped_users)
  const helping_by_users = JSON.parse(resData.helping_by_users)
  const helped_by_users = JSON.parse(resData.helped_by_users)

  // 返回一个新对象，对用户可以自定义的信息，转义特殊字符（也可以不用）
  return {
    id: resData.id,
    username: resData.username,
    email: resData.email,
    // nickname: escape(nickname),
    nickname,
    avatar,
    // contact_info: escape(resData.contact_info),
    contact_info: resData.contact_info,
    // bio: escape(resData.bio),
    bio: resData.bio,
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

// 解析用户通知、"content"转义特殊字符（也可以不用）
export const parseUserNotification = (resData) => {
  const notifications = JSON.parse(resData.notifications)
  // notifications.forEach((notification) => {
  //   notification.content = escape(notification.content)
  // })
  return notifications
}
