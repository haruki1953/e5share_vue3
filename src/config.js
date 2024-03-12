// logo图标
import logoImage from '@/assets/logo.png'
export { logoImage }

// 登录页图片
import loginImage from '@/assets/login_bg.jpg'
export { loginImage }

// axios配置，基地址、超时时间
export const axiosConfig = {
  baseURL: 'http://127.0.0.1:3007',
  timeout: 10000
}

// 头像配置，基地址‘默认头像
import defaultAvatar from '@/assets/default_avatar.jpg'
export const avatarConfig = {
  baseURL: 'http://127.0.0.1:3007/static/avatar',
  defaultAvatar
}

// 管理员联系方式
export const adminContact = 'X / Twitter: @harukiO_0'

// 用户状态配置
export const accountStatus = {
  active: 'active',
  banned: 'banned',
  sharing: 'sharing'
}

// 未登录时可以访问的路径
export const publicRoutes = ['/login', '/home']

// 通知类型配置
export const notificationType = {
  // 系统通知
  system: 'system',
  // 其他通知
  other: 'other',
  // e5分享申请通知
  e5_share_application: 'e5_share_application',
  // e5分享确认通知
  e5_share_confirmation: 'e5_share_confirmation',
  // e5分享完成通知
  e5_share_completion: 'e5_share_completion',
  // e5分享注销通知
  e5_share_closure: 'e5_share_closure',
  // e5账号主停止分享通知
  e5_share_sharer_stop: 'e5_share_sharer_stop',
  // 用户停止接受分享通知
  e5_share_receiver_stop: 'e5_share_receiver_stop'
}
